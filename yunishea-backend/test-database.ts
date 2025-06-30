import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log("🔄 Test de connexion à la base de données...");

    // Tester la connexion
    await prisma.$connect();
    console.log("✅ Connexion à la base de données réussie !");

    // Compter les utilisateurs (devrait être 0)
    const userCount = await prisma.user.count();
    console.log(`📊 Nombre d'utilisateurs dans la base: ${userCount}`);

    // Tester l'insertion d'un utilisateur (optionnel)
    console.log("🧪 Test d'insertion d'un utilisateur...");

    // Vérifier si un utilisateur test existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: "test@yunishea.com" },
    });

    if (!existingUser) {
      const testUser = await prisma.user.create({
        data: {
          email: "test@yunishea.com",
          password: "test123", // En vrai, il faudra le hasher
          firstName: "Test",
          lastName: "User",
          university: "Université de Test",
          level: "LICENCE_1",
        },
      });
      console.log("✅ Utilisateur test créé:", testUser.email);
    } else {
      console.log("ℹ️  Utilisateur test existe déjà");
    }

    // Compter à nouveau
    const newUserCount = await prisma.user.count();
    console.log(`📊 Nombre d'utilisateurs après test: ${newUserCount}`);

    console.log("🎉 Base de données configurée et fonctionnelle !");
  } catch (error) {
    console.error("❌ Erreur:", error);
  } finally {
    await prisma.$disconnect();
    console.log("🔌 Connexion fermée");
  }
}

testConnection();
