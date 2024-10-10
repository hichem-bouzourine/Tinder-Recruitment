const prisma = require('../prisma/prisma');

//Ajouter une offre aux favoris de l'etudiant connecté 
const addFavori = async (req, res) => {
    const userId = req.user.id; // Recupere l'id de l'user connecté depuis le token

    const { offreId } = req.body; // Récupérer l'ID de l'offre à ajouter aux favoris

  try {
    // Vérifier que l'utilisateur est un étudiant
    const etudiant = await prisma.etudiant.findUnique({
      where: { userId: userId },
    });

    if (!etudiant) {
      return res.status(403).json({ error: 'Accès refusé. Vous devez être un étudiant pour ajouter des favoris.' });
    }

    // Vérifier que l'offre existe
    const offre = await prisma.offre.findUnique({
      where: { id: offreId },
    });

    if (!offre) {
      return res.status(404).json({ error: 'Offre non trouvée.' });
    }

    // Ajouter l'offre aux favoris de l'étudiant
    const newFavori = await prisma.favori.create({
      data: {
        etudiant: { connect: { id: etudiant.id } },
        offre: { connect: { id: offre.id } },
      },
    });

    res.status(201).json(newFavori);
  } catch (error) {
    if (error.code === 'P2002') {
      res.status(400).json({ error: 'Cette offre est déjà dans vos favoris.' });
    } else {
      res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'offre aux favoris.' });
    }
  }
};

module.exports = {
  addFavori,
};