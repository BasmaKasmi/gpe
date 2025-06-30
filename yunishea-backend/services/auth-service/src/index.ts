import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { config } from "./config";
import authRoutes from "./routes/authRoutes";

const app = express();

// Middleware de sécurité
app.use(helmet());

// Configuration CORS
app.use(
  cors({
    origin: config.corsOrigins,
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: {
    success: false,
    message: "Trop de requêtes, veuillez réessayer plus tard",
  },
});
app.use(limiter);

// Middleware pour parser le JSON
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Route de santé
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "YuniShea Auth Service est en ligne",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// Routes d'authentification
app.use("/api/v1/auth", authRoutes);

// Middleware de gestion des erreurs 404
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route non trouvée",
  });
});

// Middleware de gestion des erreurs globales
app.use(
  (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Erreur globale:", error);

    res.status(500).json({
      success: false,
      message: "Erreur interne du serveur",
      ...(config.env === "development" && { error: error.message }),
    });
  }
);

// Démarrage du serveur
app.listen(config.port, () => {
  console.log(`🚀 YuniShea Auth Service démarré sur le port ${config.port}`);
  console.log(`🌍 Environment: ${config.env}`);
  console.log(`🔗 Health check: http://localhost:${config.port}/health`);
  console.log(`🔐 Auth API: http://localhost:${config.port}/api/v1/auth`);
  console.log("📋 Endpoints disponibles:");
  console.log("   POST /api/v1/auth/register - Inscription");
  console.log("   POST /api/v1/auth/login - Connexion");
  console.log("   POST /api/v1/auth/refresh-token - Renouveler le token");
  console.log("   GET  /api/v1/auth/me - Profil utilisateur");
  console.log("   POST /api/v1/auth/logout - Déconnexion");
});

export default app;
