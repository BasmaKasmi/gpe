# 📡 YuniShea API Documentation

## 🌐 Base URL

```
http://localhost:3001
```

---

## 📋 Endpoints

### 1. Health Check

```
GET /health
```

**Réponse :**

```json
{
  "success": true,
  "message": "YuniShea Auth Service est en ligne"
}
```

---

### 2. Inscription

```
POST /api/v1/auth/register
```

**Données à envoyer :**

```json
{
  "email": "user@example.com", // OBLIGATOIRE
  "password": "password123", // OBLIGATOIRE (min 8 chars)
  "firstName": "John", // OBLIGATOIRE
  "lastName": "Doe", // OBLIGATOIRE
  "phone": "0123456789", // optionnel
  "university": "Sorbonne", // optionnel
  "level": "MASTER_1", // optionnel
  "field": "Informatique" // optionnel
}
```

**Niveaux possibles :**

- `LICENCE_1`, `LICENCE_2`, `LICENCE_3`
- `MASTER_1`, `MASTER_2`
- `DOCTORAT`, `AUTRE`

**Réponse succès :**

```json
{
  "success": true,
  "message": "Inscription réussie",
  "data": {
    "user": {
      /* infos utilisateur */
    },
    "accessToken": "eyJhbGci...",
    "refreshToken": "eyJhbGci..."
  }
}
```

**Réponse erreur :**

```json
{
  "success": false,
  "message": "Un utilisateur avec cet email existe déjà"
}
```

---

### 3. Connexion

```
POST /api/v1/auth/login
```

**Données à envoyer :**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Réponse succès :**

```json
{
  "success": true,
  "message": "Connexion réussie",
  "data": {
    "user": {
      /* infos utilisateur */
    },
    "accessToken": "eyJhbGci...",
    "refreshToken": "eyJhbGci..."
  }
}
```

**Réponse erreur :**

```json
{
  "success": false,
  "message": "Email ou mot de passe incorrect"
}
```

---

### 4. Profil utilisateur

```
GET /api/v1/auth/me
```

**Headers :**

```
Authorization: Bearer {accessToken}
```

**Réponse succès :**

```json
{
  "success": true,
  "message": "Profil utilisateur récupéré",
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "university": "Sorbonne",
      "level": "MASTER_1",
      "field": "Informatique",
      "city": "Paris",
      "isVerified": false,
      "createdAt": "2025-06-27T13:30:39.143Z"
    }
  }
}
```

**Réponse erreur :**

```json
{
  "success": false,
  "message": "Token invalide ou expiré"
}
```

---

### 5. Renouveler token

```
POST /api/v1/auth/refresh-token
```

**Données à envoyer :**

```json
{
  "refreshToken": "eyJhbGci..."
}
```

**Réponse succès :**

```json
{
  "success": true,
  "message": "Token rafraîchi avec succès",
  "data": {
    "accessToken": "eyJhbGci...",
    "refreshToken": "eyJhbGci..."
  }
}
```

---

### 6. Déconnexion

```
POST /api/v1/auth/logout
```

**Réponse :**

```json
{
  "success": true,
  "message": "Déconnexion réussie"
}
```

---

## 🚨 Codes d'erreur

| Code | Description       |
| ---- | ----------------- |
| 200  | Succès            |
| 201  | Créé avec succès  |
| 400  | Données invalides |
| 401  | Non authentifié   |
| 404  | Non trouvé        |
| 500  | Erreur serveur    |

---

## 📋 Validation

- **Email** : Format valide + unique
- **Password** : Minimum 8 caractères
- **FirstName/LastName** : 2-50 caractères
- **Phone** : Format numérique
- **Level** : Doit être dans la liste autorisée
