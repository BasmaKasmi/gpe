# YuniShea Backend - Documentation

**Plateforme d'économie circulaire et d'entraide pour étudiants**

## Table des matières

- [Architecture](#architecture)
- [Démarrage rapide](#démarrage-rapide)
- [API Documentation](./API-Documentation.md)
- [Guide Frontend React Native](./Frontend-Guide.md)
- [Tests Postman](./Postman-Tests.md)

## Architecture

```
YuniShea Backend (Microservices)
Auth Service (Port 3001)
User Service (Port 3002) - À venir
Listing Service (Port 3003) - À venir
Messaging Service (Port 3004) - À venir
Notification Service (Port 3005) - À venir
API Gateway (Port 3000) - À venir
```

## Démarrage rapide

### Prérequis

- Node.js v18+
- MySQL v8.0+
- npm ou yarn

### Installation

```bash
# Cloner le projet
git clone git@rendu-git.etna-alternance.net:module-10021/activity-53634/group-1056985
cd yunishea-backend

# Installer les dépendances
npm install

# Configurer la base de données
cp .env.example .env
# Modifier .env avec tes paramètres MySQL

# Lancer les migrations
npx prisma migrate dev

# Démarrer le service d'authentification
cd services/auth-service
npm run dev
```

## ✅ Services disponibles

| Service                 | Status              | Port | Documentation                      |
| ----------------------- | ------------------- | ---- | ---------------------------------- |
| 🔐 Auth Service         | ✅ Opérationnel     | 3001 | [API Docs](./API-Documentation.md) |
| 👥 User Service         | 🔄 En développement | 3002 | -                                  |
| 📝 Listing Service      | 📋 Planifié         | 3003 | -                                  |
| 💬 Messaging Service    | 📋 Planifié         | 3004 | -                                  |
| 🔔 Notification Service | 📋 Planifié         | 3005 | -                                  |

## 🛠️ Technologies utilisées

- **Backend** : Node.js + TypeScript + Express.js
- **Base de données** : MySQL + Prisma ORM
- **Authentification** : JWT
- **Validation** : Joi
- **Sécurité** : bcrypt, helmet, CORS, rate limiting
