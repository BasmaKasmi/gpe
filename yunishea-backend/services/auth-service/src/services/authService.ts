import prisma from "../config/database";
import { hashPassword, comparePassword } from "../utils/password";
import { generateTokens, verifyToken } from "../utils/jwt";

// Types pour éviter les erreurs d'import Prisma
type User = {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  avatar?: string | null;
  university?: string | null;
  studentId?: string | null;
  level?: StudentLevel | null;
  field?: string | null;
  bio?: string | null;
  address?: string | null;
  city: string;
  postalCode?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  isVerified: boolean;
  isActive: boolean;
  preferences?: any;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date | null;
};

type StudentLevel =
  | "LICENCE_1"
  | "LICENCE_2"
  | "LICENCE_3"
  | "MASTER_1"
  | "MASTER_2"
  | "DOCTORAT"
  | "AUTRE";

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  university?: string;
  studentId?: string;
  level?: StudentLevel;
  field?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: Omit<User, "password">;
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  async register(data: RegisterData): Promise<AuthResponse> {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("Un utilisateur avec cet email existe déjà");
    }

    // Hasher le mot de passe
    const hashedPassword = await hashPassword(data.password);

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    // Générer les tokens
    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
    });

    // Mettre à jour la date de dernière connexion
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Retourner la réponse sans le mot de passe
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async login(data: LoginData): Promise<AuthResponse> {
    // Trouver l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error("Email ou mot de passe incorrect");
    }

    // Vérifier le mot de passe
    const isPasswordValid = await comparePassword(data.password, user.password);

    if (!isPasswordValid) {
      throw new Error("Email ou mot de passe incorrect");
    }

    // Vérifier si l'utilisateur est actif
    if (!user.isActive) {
      throw new Error("Compte désactivé");
    }

    // Générer les tokens
    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
    });

    // Mettre à jour la date de dernière connexion
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Retourner la réponse sans le mot de passe
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async refreshToken(
    refreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      // Vérifier le refresh token
      const payload = verifyToken(refreshToken);

      // Vérifier que l'utilisateur existe toujours
      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
      });

      if (!user || !user.isActive) {
        throw new Error("Utilisateur introuvable ou inactif");
      }

      // Générer de nouveaux tokens
      const tokens = generateTokens({
        userId: user.id,
        email: user.email,
      });

      return tokens;
    } catch (error) {
      throw new Error("Token de rafraîchissement invalide");
    }
  }

  async getCurrentUser(userId: string): Promise<Omit<User, "password">> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("Utilisateur introuvable");
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
