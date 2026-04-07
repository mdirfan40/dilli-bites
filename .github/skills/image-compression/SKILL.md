---
name: image-compression
description: Optimize images with Sharp by resizing proportionally and converting to WebP. Use when: reducing site image payload, converting assets to WebP, or standardizing image formats.
---

# Image Compression

## Workflow

1. **Evaluate source images**: Identify image files and formats that benefit from WebP conversion (JPEG, PNG, GIF, etc.).

2. **Use Sharp only**: Standardize on `sharp` for both resizing and WebP conversion so the workflow stays in one toolchain.

3. **Preserve aspect ratio**: When resizing or generating derivatives, calculate width/height based on the original aspect ratio. Avoid forcing fixed dimensions that distort the image.

4. **Set quality targets**: Choose a quality setting appropriate for the asset and use cases:
   - `75-85` for general web photos
   - higher for detailed product images
   - lower for small icons and thumbnails

5. **Convert to WebP**: Run Sharp with aspect-ratio-safe resizing and WebP output settings.

6. **Compare output**: Verify the generated WebP file visually and with size checks. Ensure a quality/size tradeoff has been met.

7. **Fallback support**: If the target environment still needs original or alternate formats, preserve the original file and serve WebP conditionally.

8. **Document the asset changes**: Record conversion decisions, quality settings used, and any resizing rules.

## Quality Criteria

- Output images are in WebP format where appropriate
- Original image dimensions are preserved or resized proportionally
- File size is reduced without unacceptable visual quality loss
- No image distortion or stretched aspect ratio
- Converted images display correctly in target rendering contexts

## Decision Points

- If the image is already an optimized WebP, skip conversion.
- If the source is a transparent PNG, use Sharp lossless WebP output when visual fidelity matters.
- If quality loss is noticeable, increase quality or switch to a less aggressive compression mode.
- If target browsers need fallback, keep original images and serve WebP selectively.

## Examples

- Convert and resize with Sharp only:
  - `npm run images:webp -- images --width 1200 --quality 80`

- Resize proportionally with Sharp in code:
  - `sharp(input).resize({ width: 1200, fit: 'inside', withoutEnlargement: true }).webp({ quality: 80 }).toFile(output)`

- Keep transparency-sensitive PNGs sharp:
  - `npm run images:webp -- images/logo.png --lossless --overwrite`
