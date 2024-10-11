const express = require('express');

const { getAllUsers, updateUser, updateEtudiant, updateRecruteur } = require('../controllers/userController');

const router = express.Router();

// Définir les routes pour les utilisateurs
router.get('/', getAllUsers);
router.put('/me', updateUser);
router.put('/etudiant/me', updateEtudiant);
router.put('/recruteur/me', updateRecruteur);

module.exports = router;