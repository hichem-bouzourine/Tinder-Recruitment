const express = require('express');

const { getRecruiter, getAllUsers, updateUser, getEtudiant, updateEtudiant, updateRecruteur } = require('../controllers/userController');

const router = express.Router();

// Définir les routes pour les utilisateurs
router.get('/', getAllUsers);
router.put('/me', updateUser);
router.put('/etudiant/me/:id', updateEtudiant);
router.get('/etudiant/:id', getEtudiant);
router.put('/recruteur/me/:id', updateRecruteur);
router.get('/recruteur/:id', getRecruiter);

module.exports = router;