// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // Evita múltiplas instâncias no dev
  // @ts-expect-erro
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
