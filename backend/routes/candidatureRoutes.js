const express = require('express');
const { createCandidature, getCandidaturesByEtudiant, getAllCandidatures, getCandidatureById, getCandidatureToRecruiter } = require('../controllers/candidatureController');

const router = express.Router();

// Route pour créer une candidature
router.post('/', createCandidature);
router.get('/etudiant/:id', getCandidaturesByEtudiant);
router.get('/', getAllCandidatures);
router.get('/:id', getCandidatureById);
router.get('/recruiter/:id', getCandidatureToRecruiter);


module.exports = router;
