const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Ajouter les universités
  const universites = await prisma.universite.createMany({
    data: [
      { nom: 'Université Paris-Sorbonne' },
      { nom: 'Université de Lyon' },
      { nom: 'Université de Montpellier' },
      { nom: 'Université de Strasbourg' },
      { nom: 'Université de Bordeaux' },
    ],
  });

  // Ajouter les entreprises
  const entreprises = await prisma.entreprise.createMany({
    data: [
      { nom: 'Capgemini' },
      { nom: 'Google France' },
      { nom: 'BNP Paribas' },
      { nom: 'Airbus' },
      { nom: 'L\'Oréal' },
    ],
  });

  console.log('Universités et entreprises ont été ajoutées avec succès !');
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
