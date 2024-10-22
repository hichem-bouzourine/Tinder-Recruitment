const express = require('express');
const { createCandidature, getCandidaturesByEtudiant, getAllCandidatures, getCandidatureById, getCandidatureToRecruiter } = require('../controllers/candidatureController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Route pour créer une candidature
router.post('/', authenticateToken, createCandidature);
router.get('/etudiant/:id', getCandidaturesByEtudiant);
router.get('/', getAllCandidatures);
router.get('/:id', getCandidatureById);
router.get('/recruiter/:id', getCandidatureToRecruiter);


module.exports = router;
