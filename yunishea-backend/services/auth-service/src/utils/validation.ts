import Joi from "joi";

export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email doit être valide",
    "any.required": "Email est requis",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Le mot de passe doit contenir au moins 8 caractères",
    "any.required": "Mot de passe est requis",
  }),
  firstName: Joi.string().min(2).max(50).required().messages({
    "string.min": "Le prénom doit contenir au moins 2 caractères",
    "string.max": "Le prénom ne peut pas dépasser 50 caractères",
    "any.required": "Prénom est requis",
  }),
  lastName: Joi.string().min(2).max(50).required().messages({
    "string.min": "Le nom doit contenir au moins 2 caractères",
    "string.max": "Le nom ne peut pas dépasser 50 caractères",
    "any.required": "Nom est requis",
  }),
  phone: Joi.string()
    .pattern(/^[\+]?[0-9\s\-\(\)]+$/)
    .optional()
    .messages({
      "string.pattern.base": "Numéro de téléphone invalide",
    }),
  university: Joi.string().max(100).optional(),
  studentId: Joi.string().max(50).optional(),
  level: Joi.string()
    .valid(
      "LICENCE_1",
      "LICENCE_2",
      "LICENCE_3",
      "MASTER_1",
      "MASTER_2",
      "DOCTORAT",
      "AUTRE"
    )
    .optional(),
  field: Joi.string().max(100).optional(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email doit être valide",
    "any.required": "Email est requis",
  }),
  password: Joi.string().required().messages({
    "any.required": "Mot de passe est requis",
  }),
});

export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required().messages({
    "any.required": "Token de rafraîchissement requis",
  }),
});
