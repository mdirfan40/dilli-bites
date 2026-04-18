import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis
const currentFilePath = fileURLToPath(import.meta.url)
const currentDirPath = path.dirname(currentFilePath)
const defaultDatabasePath = path.resolve(currentDirPath, '../prisma/dev.db')
const databaseUrl = process.env.DATABASE_URL ?? `file:${defaultDatabasePath}`
const adapter = globalForPrisma.prismaAdapter ?? new PrismaBetterSqlite3({ url: databaseUrl })

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prismaAdapter = adapter
  globalForPrisma.prisma = prisma
}