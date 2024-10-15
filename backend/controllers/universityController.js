const prisma = require('../prisma/prisma');

const getAllUniversites = async (req, res) => {
    try {
        const universites = await prisma.universite.findMany();
        res.status(200).json(universites);
    } catch (err) {
        res.status(500).json({ err: "Erreur lors de la recuperation des universites" });
    }
}

const getOneUniversite = async (req, res) => {
    const universiteId = parseInt(req.params.id);
    try {
        const universite = await prisma.universite.findUnique({
            where: { id: universiteId },
        });
        if (!universite) {
            return res.status(404).json({ error: 'universite non trouvée.' });
        }
        res.status(200).json(universite);
    } catch (err) {
        res.status(500).json({ err: 'Erreur lors de la récupération de l\'universite.' });
    }
}

const getUniversiteByName = async (req, res) => {
    const { nom } = req.body;
    try {
        const universite = await prisma.universite.findUnique({
            where: { nom: nom },
        });
        if (!universite) {
            return res.status(404).json({ error: 'universite non trouvée.' });
        }
        res.status(200).json(universite);
    } catch (err) {
        res.status(500).json({ err: 'Erreur lors de la récupération de l\'universite.' });
    }
}


const createUniversite = async (req, res) => {
    const { nom } = req.body;
    try {
        const newUniversite = await prisma.universite.create({
            data: {
                nom
            },
        });
        res.status(201).json(newUniversite);
    } catch (err) {
        res.status(500).json({ err: 'Erreur lors de la création de l\'universite.' });
    }
}

const updateUniversite = async (req, res) => {
    const { nom } = req.body;
    const universiteId = parseInt(req.params.id);
    try {
        const updatedUniversite = await prisma.universite.update({
            where: { id: universiteId },
            data: {
                nom
            },
        });
        res.status(200).json(updatedUniversite);
    } catch (error) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Universite non trouvée.' });
        } else {
            res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'universite.' });
        }
    }
}

const deleteUniversite = async (req, res) => {
    const universiteId = parseInt(req.params.id);
    try {
        await prisma.universite.delete({
            where: { id: universiteId },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'universite.' });
    }
}

const getStudentsByUniversite = async (req, res) => {
    const universiteId = parseInt(req.params.id);
    try {
        const students = await prisma.user.findMany({
            where: { universiteId: universiteId },
            include: {
                etudiant: true
            }
        });
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des students.' });
    }
}

module.exports = {
    getAllUniversites,
    getOneUniversite,
    getUniversiteByName,
    createUniversite,
    updateUniversite,
    deleteUniversite,
    getStudentsByUniversite,

};