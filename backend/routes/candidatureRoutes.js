const express = require('express');
const { createCandidature, getCandidaturesByEtudiant } = require('../controllers/candidatureController');

const router = express.Router();

// Route pour créer une candidature
router.post('/candidature', createCandidature);
router.get('/', getCandidaturesByEtudiant);


module.exports = router;
