import dotenv from "dotenv";

dotenv.config();

export const config = {
  app: {
    name: process.env.APP_NAME || "YuniShea Backend",
    version: process.env.APP_VERSION || "1.0.0",
    apiPrefix: process.env.API_PREFIX || "/api/v1",
  },
  database: {
    url: process.env.DATABASE_URL || "",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "yunishea-backend-fallback-secret",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "30d",
  },
  server: {
    host: process.env.API_GATEWAY_HOST || "localhost",
    ports: {
      apiGateway: parseInt(process.env.API_GATEWAY_PORT || "3000"),
      authService: parseInt(process.env.AUTH_SERVICE_PORT || "3001"),
      userService: parseInt(process.env.USER_SERVICE_PORT || "3002"),
      listingService: parseInt(process.env.LISTING_SERVICE_PORT || "3003"),
      messagingService: parseInt(process.env.MESSAGING_SERVICE_PORT || "3004"),
      notificationService: parseInt(
        process.env.NOTIFICATION_SERVICE_PORT || "3005"
      ),
    },
  },
  features: {
    foodSharing: process.env.ENABLE_FOOD_SHARING === "true",
    objectExchange: process.env.ENABLE_OBJECT_EXCHANGE === "true",
    academicHelp: process.env.ENABLE_ACADEMIC_HELP === "true",
    eventManagement: process.env.ENABLE_EVENT_MANAGEMENT === "true",
  },
  security: {
    corsOrigins: process.env.CORS_ORIGINS?.split(",") || [
      "http://localhost:3000",
    ],
    rateLimit: {
      max: parseInt(process.env.RATE_LIMIT_MAX || "100"),
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"),
    },
  },
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || "5242880"), // 5MB
    uploadPath: process.env.UPLOAD_PATH || "./uploads",
    allowedTypes: process.env.ALLOWED_FILE_TYPES?.split(",") || [
      "image/jpeg",
      "image/png",
      "image/webp",
    ],
  },
  email: {
    host: process.env.SMTP_HOST || "",
    port: parseInt(process.env.SMTP_PORT || "587"),
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
    from: process.env.YUNISHEA_EMAIL_FROM || "noreply@yunishea.com",
  },
  logging: {
    level: process.env.LOG_LEVEL || "info",
    file: process.env.LOG_FILE || "logs/yunishea-backend.log",
  },
  env: process.env.NODE_ENV || "development",
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
};
