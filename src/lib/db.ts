import { PrismaClient } from "@prisma/client";

declare global {
  var cachedPrisma: PrismaClient;
}

let db: PrismaClient | undefined;

if (process.env.NODE_ENV === "production") {
  db = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  db = global.cachedPrisma;
}

export { db };
