import jwt from "jsonwebtoken";
import { config } from "../config";

export interface TokenPayload {
  userId: string;
  email: string;
}

export const generateTokens = (payload: TokenPayload) => {
  if (!config.jwtSecret) {
    throw new Error("JWT_SECRET n'est pas configuré");
  }

  console.log("🔑 Génération des tokens...");

  const accessToken = (jwt as any).sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });

  const refreshToken = (jwt as any).sign(payload, config.jwtSecret, {
    expiresIn: config.jwtRefreshExpiresIn,
  });

  return { accessToken, refreshToken };
};

export const verifyToken = (token: string): TokenPayload => {
  if (!config.jwtSecret) {
    throw new Error("JWT_SECRET n'est pas configuré");
  }

  return (jwt as any).verify(token, config.jwtSecret) as TokenPayload;
};

export const extractTokenFromHeader = (
  authorization?: string
): string | null => {
  if (!authorization) return null;

  const parts = authorization.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") return null;

  return parts[1];
};
