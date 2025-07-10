import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../../.env") });

const databaseUrl =
  process.env.DATABASE_URL ||
  "mysql://root:root@localhost:3306/yunishea_backend_db";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
  log: ["query", "info", "warn", "error"],
});

export default prisma;
