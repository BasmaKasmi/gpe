import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { validateRequest } from "../middleware/validation";
import { authenticateToken } from "../middleware/auth";
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
} from "../utils/validation";

const router = Router();
const authController = new AuthController();

router.post(
  "/register",
  validateRequest(registerSchema),
  authController.register
);

router.post("/login", validateRequest(loginSchema), authController.login);

router.post(
  "/refresh-token",
  validateRequest(refreshTokenSchema),
  authController.refreshToken
);

router.get("/me", authenticateToken, authController.getCurrentUser);

router.post("/logout", authController.logout);

export default router;
