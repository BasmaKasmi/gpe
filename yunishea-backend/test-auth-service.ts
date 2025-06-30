// Test script pour vérifier le service d'authentification
// À lancer avec: npx ts-node test-auth-service.ts

async function testAuthService() {
  const baseUrl = "http://localhost:3001/api/v1/auth";

  console.log("🧪 Test du service d'authentification YuniShea");
  console.log("===============================================");

  try {
    // Test 1: Health check
    console.log("\n1. 🏥 Test du health check...");
    const healthResponse = await fetch("http://localhost:3001/health");
    const healthData = await healthResponse.json();
    console.log("✅ Health check:", healthData.message);

    // Test 2: Inscription d'un nouvel utilisateur
    console.log("\n2. 📝 Test d'inscription...");
    const registerData = {
      email: `test${Date.now()}@yunishea.com`,
      password: "password123",
      firstName: "Test",
      lastName: "User",
      university: "Université de Test",
      level: "LICENCE_1",
      field: "Informatique",
    };

    const registerResponse = await fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    });

    const registerResult = await registerResponse.json();

    if (registerResponse.ok) {
      console.log("✅ Inscription réussie:", registerResult.data.user.email);
      console.log(
        "🔑 Token généré:",
        registerResult.data.accessToken ? "Oui" : "Non"
      );
    } else {
      console.log("❌ Erreur inscription:", registerResult.message);
    }

    // Test 3: Connexion
    console.log("\n3. 🔐 Test de connexion...");
    const loginResponse = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: registerData.email,
        password: registerData.password,
      }),
    });

    const loginResult = await loginResponse.json();

    if (loginResponse.ok) {
      console.log("✅ Connexion réussie");

      // Test 4: Récupération du profil utilisateur
      console.log("\n4. 👤 Test récupération profil...");
      const profileResponse = await fetch(`${baseUrl}/me`, {
        headers: {
          Authorization: `Bearer ${loginResult.data.accessToken}`,
        },
      });

      const profileResult = await profileResponse.json();

      if (profileResponse.ok) {
        console.log(
          "✅ Profil récupéré:",
          profileResult.data.user.firstName,
          profileResult.data.user.lastName
        );
      } else {
        console.log("❌ Erreur profil:", profileResult.message);
      }
    } else {
      console.log("❌ Erreur connexion:", loginResult.message);
    }

    console.log("\n🎉 Tests terminés !");
  } catch (error) {
    console.error("❌ Erreur lors des tests:", error);
    console.log(
      "\n💡 Assurez-vous que le service est démarré avec: npm run dev"
    );
  }
}

// Note: Ce script nécessite que le service soit démarré
console.log("💡 Pour lancer les tests:");
console.log("1. Démarrer le service: npm run dev");
console.log("2. Dans un autre terminal: npx ts-node test-auth-service.ts");
console.log(
  "\nOu utiliser un client comme Postman/Insomnia pour tester les endpoints:"
);
console.log("- POST http://localhost:3001/api/v1/auth/register");
console.log("- POST http://localhost:3001/api/v1/auth/login");
console.log("- GET http://localhost:3001/api/v1/auth/me (avec Bearer token)");

export {};
