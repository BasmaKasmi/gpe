# 🧪 YuniShea Postman Tests

Collection de tests pour l'API YuniShea.

## 🎯 Configuration

**Base URL :** `http://localhost:3001`

---

## 1️⃣ Health Check

**GET** `http://localhost:3001/health`

**Headers :** Aucun

**Body :** Aucun

**Résultat attendu :** ✅ Status 200

---

## 2️⃣ Inscription complète

**POST** `http://localhost:3001/api/v1/auth/register`

**Headers :**

```
Content-Type: application/json
```

**Body :**

```json
{
  "email": "john.doe@yunishea.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "0123456789",
  "university": "Université de Paris",
  "studentId": "20240001",
  "level": "MASTER_1",
  "field": "Informatique"
}
```

**Résultat attendu :** ✅ Status 201 + tokens

---

## 3️⃣ Inscription minimale

**POST** `http://localhost:3001/api/v1/auth/register`

**Headers :**

```
Content-Type: application/json
```

**Body :**

```json
{
  "email": "jane.smith@yunishea.com",
  "password": "motdepasse456",
  "firstName": "Jane",
  "lastName": "Smith"
}
```

**Résultat attendu :** ✅ Status 201

---

## 4️⃣ Erreur - Email déjà utilisé

**POST** `http://localhost:3001/api/v1/auth/register`

**Body :**

```json
{
  "email": "john.doe@yunishea.com",
  "password": "autremotdepasse",
  "firstName": "Autre",
  "lastName": "Utilisateur"
}
```

**Résultat attendu :** ❌ Status 400

```json
{
  "success": false,
  "message": "Un utilisateur avec cet email existe déjà"
}
```

---

## 5️⃣ Erreur - Mot de passe trop court

**POST** `http://localhost:3001/api/v1/auth/register`

**Body :**

```json
{
  "email": "test@yunishea.com",
  "password": "123",
  "firstName": "Test",
  "lastName": "User"
}
```

**Résultat attendu :** ❌ Status 400

```json
{
  "success": false,
  "message": "Données invalides",
  "error": "Le mot de passe doit contenir au moins 8 caractères"
}
```

---

## 6️⃣ Connexion réussie

**POST** `http://localhost:3001/api/v1/auth/login`

**Body :**

```json
{
  "email": "john.doe@yunishea.com",
  "password": "password123"
}
```

**Résultat attendu :** ✅ Status 200 + tokens

**⚠️ IMPORTANT :** Copier l'`accessToken` pour les tests suivants !

---

## 7️⃣ Erreur - Mauvais mot de passe

**POST** `http://localhost:3001/api/v1/auth/login`

**Body :**

```json
{
  "email": "john.doe@yunishea.com",
  "password": "mauvaismdp"
}
```

**Résultat attendu :** ❌ Status 401

```json
{
  "success": false,
  "message": "Email ou mot de passe incorrect"
}
```

---

## 8️⃣ Profil utilisateur avec token

**GET** `http://localhost:3001/api/v1/auth/me`

**Headers :**

```
Authorization: Bearer COLLER_TON_TOKEN_ICI
```

**Body :** Aucun

**Résultat attendu :** ✅ Status 200 + données utilisateur

---

## 9️⃣ Erreur - Token manquant

**GET** `http://localhost:3001/api/v1/auth/me`

**Headers :** Aucun

**Body :** Aucun

**Résultat attendu :** ❌ Status 401

```json
{
  "success": false,
  "message": "Token d'accès requis"
}
```

---

## 🔟 Erreur - Token invalide

**GET** `http://localhost:3001/api/v1/auth/me`

**Headers :**

```
Authorization: Bearer token_invalide_123
```

**Résultat attendu :** ❌ Status 401

```json
{
  "success": false,
  "message": "Token invalide ou expiré"
}
```

---

## 1️⃣1️⃣ Renouveler token

**POST** `http://localhost:3001/api/v1/auth/refresh-token`

**Body :**

```json
{
  "refreshToken": "COLLER_TON_REFRESH_TOKEN_ICI"
}
```

**Résultat attendu :** ✅ Status 200 + nouveaux tokens

---

## 1️⃣2️⃣ Déconnexion

**POST** `http://localhost:3001/api/v1/auth/logout`

**Headers :** Aucun

**Body :** Aucun

**Résultat attendu :** ✅ Status 200

```json
{
  "success": true,
  "message": "Déconnexion réussie"
}
```

---

## 📋 Ordre de test recommandé

1. ✅ **Health Check** - Vérifier que le service fonctionne
2. ✅ **Inscription complète** - Créer un utilisateur avec toutes les données
3. ✅ **Inscription minimale** - Créer un utilisateur avec données obligatoires seulement
4. ❌ **Email déjà utilisé** - Tester la validation d'unicité
5. ❌ **Mot de passe court** - Tester la validation de longueur
6. ✅ **Connexion réussie** - Se connecter (COPIER LE TOKEN !)
7. ❌ **Mauvais mot de passe** - Tester l'authentification
8. ✅ **Profil avec token** - Utiliser le token copié
9. ❌ **Token manquant** - Tester la sécurité
10. ❌ **Token invalide** - Tester la validation de token
11. ✅ **Renouveler token** - Utiliser le refresh token
12. ✅ **Déconnexion** - Terminer la session

---

## 📊 Variables Postman (optionnel)

Pour simplifier les tests, créer ces variables :

| Variable       | Valeur                  |
| -------------- | ----------------------- |
| `baseUrl`      | `http://localhost:3001` |
| `accessToken`  | (à remplir après login) |
| `refreshToken` | (à remplir après login) |

**Utilisation :**

```
{{baseUrl}}/api/v1/auth/login
Authorization: Bearer {{accessToken}}
```

---

## 🎯 Résultats attendus

**Tests qui doivent RÉUSSIR (✅) :**

- Health Check
- Inscription complète
- Inscription minimale
- Connexion réussie
- Profil avec bon token
- Renouveler token
- Déconnexion

**Tests qui doivent ÉCHOUER (❌) :**

- Email déjà utilisé
- Mot de passe trop court
- Mauvais mot de passe
- Token manquant
- Token invalide

---

## 🚀 Lancement des tests

1. **Démarrer le backend :**

   ```bash
   cd yunishea-backend/services/auth-service
   npm run dev
   ```

2. **Ouvrir Postman**

3. **Tester dans l'ordre** de la liste ci-dessus
