const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');

const SUPPORTED_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg']);
const VALID_FITS = new Set(['cover', 'contain', 'fill', 'inside', 'outside']);

function parseArgs(argv) {
  const options = {
    width: null,
    height: null,
    quality: 80,
    fit: 'inside',
    outputDir: null,
    exclude: [],
    overwrite: false,
    lossless: false,
    inputs: [],
  };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];

    if (!value.startsWith('--')) {
      options.inputs.push(value);
      continue;
    }

    const [flag, inlineValue] = value.split('=');
    const nextValue = inlineValue ?? argv[index + 1];

    switch (flag) {
      case '--width':
        options.width = Number.parseInt(nextValue, 10);
        if (!inlineValue) {
          index += 1;
        }
        break;
      case '--height':
        options.height = Number.parseInt(nextValue, 10);
        if (!inlineValue) {
          index += 1;
        }
        break;
      case '--quality':
        options.quality = Number.parseInt(nextValue, 10);
        if (!inlineValue) {
          index += 1;
        }
        break;
      case '--fit':
        options.fit = nextValue;
        if (!inlineValue) {
          index += 1;
        }
        break;
      case '--output-dir':
        options.outputDir = nextValue;
        if (!inlineValue) {
          index += 1;
        }
        break;
      case '--exclude':
        options.exclude.push(nextValue);
        if (!inlineValue) {
          index += 1;
        }
        break;
      case '--overwrite':
        options.overwrite = true;
        break;
      case '--lossless':
        options.lossless = true;
        break;
      default:
        throw new Error(`Unknown option: ${flag}`);
    }
  }

  if (options.inputs.length === 0) {
    options.inputs.push('images');
  }

  if (Number.isNaN(options.width) || options.width <= 0) {
    options.width = null;
  }

  if (Number.isNaN(options.height) || options.height <= 0) {
    options.height = null;
  }

  if (Number.isNaN(options.quality) || options.quality < 1 || options.quality > 100) {
    throw new Error('Expected --quality to be a number between 1 and 100.');
  }

  if (!VALID_FITS.has(options.fit)) {
    throw new Error(`Expected --fit to be one of: ${[...VALID_FITS].join(', ')}.`);
  }

  return options;
}

async function collectImageFiles(inputPath) {
  const resolvedPath = path.resolve(inputPath);
  const stats = await fs.stat(resolvedPath);

  if (stats.isDirectory()) {
    const entries = await fs.readdir(resolvedPath, { withFileTypes: true });
    const nestedFiles = await Promise.all(
      entries.map((entry) => collectImageFiles(path.join(resolvedPath, entry.name)))
    );

    return nestedFiles.flat();
  }

  const extension = path.extname(resolvedPath).toLowerCase();
  if (!SUPPORTED_EXTENSIONS.has(extension)) {
    return [];
  }

  return [resolvedPath];
}

function buildOutputPath(sourcePath, options) {
  const fileName = `${path.basename(sourcePath, path.extname(sourcePath))}.webp`;

  if (!options.outputDir) {
    return path.join(path.dirname(sourcePath), fileName);
  }

  return path.join(path.resolve(options.outputDir), fileName);
}

async function ensureOutputDirectory(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function convertImage(sourcePath, options) {
  const sourceName = path.basename(sourcePath);
  if (options.exclude.includes(sourceName)) {
    return { sourcePath, outputPath: null, skipped: true, reason: 'excluded' };
  }

  const outputPath = buildOutputPath(sourcePath, options);

  if (!options.overwrite) {
    try {
      await fs.access(outputPath);
      return { sourcePath, outputPath, skipped: true, reason: 'exists' };
    } catch {
      // The output file does not exist yet.
    }
  }

  const image = sharp(sourcePath);
  const pipeline = options.width || options.height
    ? image.resize({
        width: options.width ?? undefined,
        height: options.height ?? undefined,
        fit: options.fit,
        withoutEnlargement: true,
      })
    : image;

  await ensureOutputDirectory(outputPath);
  await pipeline.webp({
    quality: options.quality,
    lossless: options.lossless,
  }).toFile(outputPath);

  return { sourcePath, outputPath, skipped: false, reason: 'created' };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const collectedFiles = await Promise.all(options.inputs.map(collectImageFiles));
  const imageFiles = [...new Set(collectedFiles.flat())];

  if (imageFiles.length === 0) {
    console.log('No supported source images found.');
    return;
  }

  const results = [];
  for (const imageFile of imageFiles) {
    results.push(await convertImage(imageFile, options));
  }

  for (const result of results) {
    if (result.skipped) {
      if (result.reason === 'excluded') {
        console.log(`Skipped ${result.sourcePath} because it is excluded.`);
        continue;
      }

      console.log(`Skipped ${result.sourcePath} because ${result.outputPath} already exists.`);
      continue;
    }

    console.log(`Created ${result.outputPath} from ${result.sourcePath}`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});