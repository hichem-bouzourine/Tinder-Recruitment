const express = require('express');

const {getAllUsers, createUser, loginUser, updateUser, updateEtudiant, updateRecruteur} = require('../controllers/userController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Définir les routes pour les utilisateurs
router.get('/', getAllUsers);
router.post('/', createUser);
router.post('/login', loginUser);
router.put('/me', authenticateToken, updateUser);
router.put('/etudiant/me', authenticateToken, updateEtudiant);
router.put('/recruteur/me', authenticateToken, updateRecruteur);

module.exports = router;