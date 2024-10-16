const { PrismaClient } = require('@prisma/client');
const { connect } = require('../routes');
const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.candidature.deleteMany();
  await prisma.favori.deleteMany();
  await prisma.offre.deleteMany();
  await prisma.recruteur.deleteMany();
  await prisma.etudiantCompetence.deleteMany();
  await prisma.competence.deleteMany();
  await prisma.etudiant.deleteMany();
  await prisma.universite.deleteMany();
  await prisma.entreprise.deleteMany();
  await prisma.user.deleteMany(); // Deletes all existing users

  // Create Universities and fetch their IDs
  const universites = await prisma.universite.createMany({
    data: [
      { nom: 'Université Paris-Sorbonne' },
      { nom: 'Université de Lyon' },
      { nom: 'Université de Montpellier' },
      { nom: 'Université de Strasbourg' },
      { nom: 'Université de Bordeaux' },
    ],
  });

  // Fetch the university entries to get their actual IDs
  const universiteParis = await prisma.universite.findFirst({ where: { nom: 'Université Paris-Sorbonne' } });
  const universiteMontpellier = await prisma.universite.findFirst({ where: { nom: 'Université de Montpellier' } });

  // Create Companies
  await prisma.entreprise.createMany({
    data: [
      { nom: 'Capgemini' },
      { nom: 'Google France' },
      { nom: 'BNP Paribas' },
      { nom: 'Airbus' },
      { nom: 'L\'Oréal' },
    ],
  });

  // Create Competences
  await prisma.competence.createMany({
    data: [
      { nom: 'Analyse financière' },
      { nom: 'Comptabilité' },
      { nom: 'Gestion des risques' },
      { nom: 'Modélisation financière' },
      { nom: 'Évaluation d\'actifs' },
      { nom: 'Analyse des investissements' },
      { nom: 'Gestion de trésorerie' },
      { nom: 'Marchés financiers' },
      { nom: 'Budget et contrôle de gestion' },
      { nom: 'Planification fiscale' },
    ],
  });

  const competence1 = await prisma.competence.findFirst({ where: { nom: 'Analyse financière' } });
  const competence2 = await prisma.competence.findFirst({ where: { nom: 'Comptabilité' } });

  // Create Users (Students)
  const userStudent1 = await prisma.user.create({
    data: {
      email: "student1@example.com",
      password: "password123",
      role: "STUDENT",
      etudiant: {
        create: {
          universiteId: universiteParis.id, // Use the fetched university ID
          nom: "John",
          prenom: "Doe",
          dateNaissance: new Date("1999-08-15"),
          anneeEtude: "3rd Year",
          competences: {
            create: [
              { competenceId: competence1.id },
              { competenceId: competence2.id },
            ]
          }
        }
      }
    },
    include: {
      etudiant: true
    }
  });

  const userStudent2 = await prisma.user.create({
    data: {
      email: "student2@example.com",
      password: "password123",
      role: "STUDENT",
      etudiant: {
        create: {
          universiteId: universiteMontpellier.id, // Use the fetched university ID
          nom: "Jane",
          prenom: "Smith",
          dateNaissance: new Date("2000-03-22"),
          anneeEtude: "2nd Year"
        }
      }
    },
    include: {
      etudiant: true
    }
  });


  const entreprise1 = await prisma.entreprise.findFirst({ where: { nom: 'Capgemini' } });
  const entreprise2 = await prisma.entreprise.findFirst({ where: { nom: 'Google France' } });

  // Create Users (Recruiters)
  const userRecruiter1 = await prisma.user.create({
    data: {
      email: "recruiter1@example.com",
      password: "password123",
      role: "RECRUITER",
      recruteur: {
        create: {
          entrepriseId: entreprise1.id,
          nom: "Michael",
          prenom: "Johnson",
          poste: "HR",
        }
      }
    },
    include: {
      recruteur: true
    }
  });

  const userRecruiter2 = await prisma.user.create({
    data: {
      email: "recruiter2@example.com",
      password: "password123",
      role: "RECRUITER",
      recruteur: {
        create: {
          entrepriseId: entreprise2.id,
          nom: "Emily",
          prenom: "Williams",
          poste: "CEO"
        }
      }
    },
    include: {
      recruteur: true
    }
  });

  // Create Offers
  const offer1 = await prisma.offre.create({
    data: {
      nom: "Software Engineer Internship",
      salaire: 2000.0,
      description: "6-month internship in software development.",
      localisation: "Paris",
      dateDebut: new Date("2024-01-15"),
      rythme: "FULL_TIME",
      type: "INTERNSHIP",
      recruteurId: userRecruiter1.recruteur.id  // Access recruteur ID
    }
  });

  const offer2 = await prisma.offre.create({
    data: {
      nom: "Marketing Manager",
      salaire: 5000.0,
      description: "Full-time marketing manager role.",
      localisation: "Bordeaux",
      dateDebut: new Date("2024-02-01"),
      rythme: "FULL_TIME",
      type: "FULL_TIME",
      recruteurId: userRecruiter2.recruteur.id  // Access recruteur ID
    }
  });

  // Create Candidatures
  await prisma.candidature.create({
    data: {
      etudiantId: userStudent1.etudiant.id,
      offreId: offer1.id,
      etat: "PENDING"
    }
  });

  await prisma.candidature.create({
    data: {
      etudiantId: userStudent2.etudiant.id,
      offreId: offer2.id,
      etat: "PENDING"
    }
  });

  console.log('Data has been seeded successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
