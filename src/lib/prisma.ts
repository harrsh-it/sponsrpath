import { PrismaClient } from "@prisma/client"
import { PrismaLibSql } from "@prisma/adapter-libsql"
import path from "path"

const isDev = process.env.NODE_ENV === "development"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  // Use the DATABASE_URL from .env
  const url = process.env.DATABASE_URL || "file:./prisma/dev.db"
  const adapter = new PrismaLibSql({ url })

  return new PrismaClient({
    adapter,
    log: isDev ? ["warn", "error"] : ["error"],
  })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (isDev) {
  globalForPrisma.prisma = prisma
}