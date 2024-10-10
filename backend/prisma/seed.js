const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Ajouter des utilisateurs
  const user1 = await prisma.user.create({
    data: {
      username: 'john_doe',
      password: 'password123',
      role: 'etudiant',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'jane_recruteur',
      password: 'password456',
      role: 'recruteur',
    },
  });

  // Ajouter une université
  const universite = await prisma.universite.create({
    data: {
      nom: 'Université de Paris',
    },
  });

  // Ajouter un étudiant lié à l'utilisateur et à l'université
  const etudiant = await prisma.etudiant.create({
    data: {
      userId: user1.id,
      universiteId: universite.id,
      nom: 'John',
      prenom: 'Doe',
      dateNaissance: new Date('1995-05-16'),
      anneeEtude: '3ème année',
      skills: ['JavaScript', 'Node.js'],
    },
  });

  // Ajouter une entreprise
  const entreprise = await prisma.entreprise.create({
    data: {
      nom: 'TechCorp',
    },
  });

  // Ajouter un recruteur lié à l'entreprise
  const recruteur = await prisma.recruteur.create({
    data: {
      userId: user2.id,
      entrepriseId: entreprise.id,
      nom: 'Jane',
      prenom: 'Doe',
      poste: 'Responsable des recrutements',
    },
  });

  // Ajouter une offre créée par ce recruteur
  const offre = await prisma.offre.create({
    data: {
      nom: 'Stage en Développement Web',
      salaire: 1200.00,
      description: 'Stage de 6 mois en développement web fullstack.',
      localisation: 'Paris',
      dateDebut: new Date('2024-01-01'),
      rythme: 'Temps plein',
      type: 'Stage',
      recruteurId: recruteur.id,
    },
  });

  // Ajouter une offre en favori de l'étudiant
  const favori = await prisma.favori.create({
    data: {
      etudiantId: etudiant.id,
      offreId: offre.id,
    },
  });

  console.log('Données de seed ajoutées avec succès');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
