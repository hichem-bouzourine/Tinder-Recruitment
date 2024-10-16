const prisma = require('../prisma/prisma');

const getAllCompetences = async (req, res) => {
    try {
        const competences = await prisma.competence.findMany();
        res.status(200).json(competences);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des compétences.' });
    }
}

module.exports = {
    getAllCompetences,
};