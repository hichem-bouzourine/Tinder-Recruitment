const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Ajouter les universités
  await prisma.universite.createMany({
    data: [
      { nom: 'Université Paris-Sorbonne' },
      { nom: 'Université de Lyon' },
      { nom: 'Université de Montpellier' },
      { nom: 'Université de Strasbourg' },
      { nom: 'Université de Bordeaux' },
    ],
  });

  // Ajouter les entreprises
  await prisma.entreprise.createMany({
    data: [
      { nom: 'Capgemini' },
      { nom: 'Google France' },
      { nom: 'BNP Paribas' },
      { nom: 'Airbus' },
      { nom: 'L\'Oréal' },
    ],
  });

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

  console.log('Universités, entreprises et compétences ont été ajoutées avec succès !');
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
