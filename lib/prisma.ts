import { PrismaClient } from "@/app/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set")
  }

  if (databaseUrl.startsWith("prisma+postgres://")) {
    return new PrismaClient({ accelerateUrl: databaseUrl })
  }

  return new PrismaClient({ adapter: new PrismaPg(databaseUrl) })
}

declare global {
  var prisma: ReturnType<typeof createPrismaClient> | undefined
}

export const prisma = global.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma
}
