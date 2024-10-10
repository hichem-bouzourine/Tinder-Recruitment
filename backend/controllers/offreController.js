const prisma = require('../prisma/prisma');


//Obtenir tous les offres
const getAllOffres = async (req, res) => {
    try{
        const offres = await prisma.offre.findMany();
        res.status(200).json(offres);
    }catch(err){
        res.status(500).json({err : "Erreur lors de la recuperation des offres"});
    }
};

//Creer une nouvelle offre
const createOffre = async(req, res) => {
    const userId = req.user.id;

    try{
        //Verifie que user est un recruteur 
        const recruteur = await prisma.recruteur.findUnique({
            where: {userId: userId},
        })
        if (!recruteur) {
            return res.status(403).json({ error: 'Accès refusé. Vous devez être un recruteur pour créer une offre.' });
        }

        //Creer l'offre
        const { nom, salaire, description, localisation, dateDebut, rythme, type } = req.body;

        const newOffre = await prisma.offre.create({
            data: {
                nom,
                salaire,
                description,
                localisation,
                dateDebut: new Date(dateDebut),
                rythme,
                type,
                recruteur: { connect: { id: recruteur.id } }, // Lier l'offre au recruteur par son ID
              },
        }); 
        res.status(201).json(newOffre);
    }catch(err){
        res.status(500).json({ error: 'Erreur lors de la création de l\'offre.' });
    }
}

module.exports = {
    getAllOffres,
    createOffre,
  };