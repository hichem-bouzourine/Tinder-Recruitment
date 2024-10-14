const prisma = require('../prisma/prisma');

//Creer une candidature 
const createCandidature = async (req, res) => {
    const { offreId } = req.body;
    const userId = req.user.id;

    try {
        // Vérifier si l'utilisateur connecté est un étudiant
        const etudiant = await prisma.etudiant.findUnique({
            where: { userId: userId },
      });

      if (!etudiant) {
        return res.status(403).json({ error: 'Seuls les étudiants peuvent postuler à des offres.' });
      }
  
      // Créer la candidature
      const candidature = await prisma.candidature.create({
        data: {
          etudiantId: etudiant.id,
          offreId: offreId,
          etat: 'en cours',
        },
      });
  
      res.status(201).json(candidature);
    } catch (err) {
      res.status(500).json({ err: 'Erreur lors de la création de la candidature.' });
    }
  };


  // Récupérer les candidatures d'un étudiant
const getCandidaturesByEtudiant = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const etudiant = await prisma.etudiant.findUnique({
        where: { userId: userId },
      });
  
      if (!etudiant) {
        return res.status(403).json({ error: 'Seuls les étudiants peuvent accéder à leurs candidatures.' });
      }
  
      const candidatures = await prisma.candidature.findMany({
        where: { etudiantId: etudiant.id },
        include: { offre: true },
      });
  
      res.status(200).json(candidatures);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la récupération des candidatures.' });
    }
  };
  
  module.exports = {
    createCandidature,
    getCandidaturesByEtudiant,
  };