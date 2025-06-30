import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../../.env") });

export const config = {
  port: parseInt(process.env.AUTH_SERVICE_PORT || "3001"),
  jwtSecret: process.env.JWT_SECRET || "fallback-secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "30d",
  bcryptRounds: 12,
  env: process.env.NODE_ENV || "development",
  corsOrigins: process.env.CORS_ORIGINS?.split(",") || [
    "http://localhost:3000",
  ],
  rateLimit: {
    max: parseInt(process.env.RATE_LIMIT_MAX || "100"),
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"),
  },
};
