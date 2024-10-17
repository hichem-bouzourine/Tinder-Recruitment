const prisma = require('../prisma/prisma');


//Obtenir tous les offres
const getAllOffres = async (req, res) => {
    try {
        const offres = await prisma.offre.findMany();
        res.status(200).json(offres);
    } catch (err) {
        res.status(500).json({ err: "Erreur lors de la recuperation des offres" });
    }
};

// Créer une nouvelle offre
const createOffre = async (req, res) => {

    const userId = req.body.userId;
    

    try {
        // Vérifier que l'utilisateur est un recruteur
        const recruteur = await prisma.recruteur.findUnique({
            where: { userId: parseInt(userId) },
        });

        if (!recruteur) {
            return res.status(403).json({ error: 'Accès refusé. Vous devez être un recruteur pour créer une offre.' });
        }

        // Créer l'offre
        const { nom, salaire, description, localisation, rythme, type } = req.body;
        console.log(recruteur);
        const salaireFloat = parseFloat(salaire);
        const newOffre = await prisma.offre.create({
            data: {
                nom,
                salaire: salaireFloat,
                description,
                localisation,
                type,
                recruteur: { connect: { id: recruteur.id } }, // Lier l'offre au recruteur par son ID
            },
        });
        console.log(newOffre);
        res.status(201).json(newOffre);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Erreur lors de la création de l\'offre.' });
    }
};

const getRecruiterOffers = async (req, res) => {
    const userId = req.params.id;

    try {
        const recruiter = await prisma.recruteur.findUnique({
            where: { userId: parseInt(userId) },
            include: {
                listeOffres: true,
            },
        });

        if (!recruiter) {
            return res.status(404).json({ error: 'Recruteur non trouvé.' });
        }
        res.status(200).json(recruiter.listeOffres);
    } catch (err) {
        console.log(err);

        res.status(500).json({ error: 'Erreur lors de la récupération des offres du recruteur.' });
    }
}


module.exports = {
    getAllOffres,
    createOffre,
    getRecruiterOffers
};