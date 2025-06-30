import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { AuthenticatedRequest } from "../middleware/auth";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const result = await authService.register(req.body);

      res.status(201).json({
        success: true,
        message: "Inscription réussie",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Erreur lors de l'inscription",
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result = await authService.login(req.body);

      res.status(200).json({
        success: true,
        message: "Connexion réussie",
        data: result,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Erreur lors de la connexion",
      });
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      const result = await authService.refreshToken(refreshToken);

      res.status(200).json({
        success: true,
        message: "Token rafraîchi avec succès",
        data: result,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Erreur lors du rafraîchissement du token",
      });
    }
  }

  async getCurrentUser(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Utilisateur non authentifié",
        });
      }

      const user = await authService.getCurrentUser(req.user.userId);

      res.status(200).json({
        success: true,
        message: "Profil utilisateur récupéré",
        data: { user },
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Utilisateur introuvable",
      });
    }
  }

  async logout(req: Request, res: Response) {
    res.status(200).json({
      success: true,
      message: "Déconnexion réussie",
    });
  }
}
