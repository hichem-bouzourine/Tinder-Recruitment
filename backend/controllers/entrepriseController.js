const prisma = require('../prisma/prisma');


const getAllEntreprises = async (req, res) => {
    try {
        const entreprises = await prisma.entreprise.findMany();
        res.status(200).json(entreprises);
    } catch (err) {
        res.status(500).json({ err: "Erreur lors de la recuperation des entreprises" });
    }
}

const getOneEntreprise = async (req, res) => {
    const entrepriseId = parseInt(req.params.id);
    try {
        const entreprise = await prisma.entreprise.findUnique({
            where: { id: entrepriseId },
        });
        if (!entreprise) {
            return res.status(404).json({ error: 'Entreprise non trouvée.' });
        }
        res.status(200).json(entreprise);
    } catch (err) {
        res.status(500).json({ err: 'Erreur lors de la récupération de l\'entreprise.' });
    }
}

const getEntrepriseByName = async (req, res) => {
    const { nom } = req.body;
    try {
        const entreprise = await prisma.entreprise.findUnique({
            where: { nom: nom },
        });
        if (!entreprise) {
            return res.status(404).json({ error: 'Entreprise non trouvée.' });
        }
        res.status(200).json(entreprise);
    } catch (err) {
        res.status(500).json({ err: 'Erreur lors de la récupération de l\'entreprise.' });
    }
}


const createEntreprise = async (req, res) => {
    const { nom } = req.body;
    try {
        const newEntreprise = await prisma.entreprise.create({
            data: {
                nom
            },
        });
        res.status(201).json(newEntreprise);
    } catch (err) {
        res.status(500).json({ err: 'Erreur lors de la création de l\'entreprise.' });
    }
}

const updateEntreprise = async (req, res) => {
    const { nom } = req.body;
    const entrepriseId = parseInt(req.params.id);
    try {
        const updatedEntreprise = await prisma.entreprise.update({
            where: { id: entrepriseId },
            data: {
                nom
            },
        });
        res.status(200).json(updatedEntreprise);
    } catch (error) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Entreprise non trouvée.' });
        } else {
            res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'entreprise.' });
        }
    }
}

const deleteEntreprise = async (req, res) => {
    const entrepriseId = parseInt(req.params.id);
    try {
        await prisma.entreprise.delete({
            where: { id: entrepriseId },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'entreprise.' });
    }
}

const getRecruteursByEntreprise = async (req, res) => {
    const entrepriseId = parseInt(req.params.id);
    try {
        const recruteurs = await prisma.recruteur.findMany({
            where: { entrepriseId: entrepriseId },
        });
        res.status(200).json(recruteurs);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des recruteurs.' });
    }
}

module.exports = {
    getAllEntreprises,
    getOneEntreprise,
    getEntrepriseByName,
    createEntreprise,
    updateEntreprise,
    deleteEntreprise,
    getRecruteursByEntreprise
};