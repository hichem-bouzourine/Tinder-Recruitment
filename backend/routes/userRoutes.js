const express = require('express');

const {getAllUsers, createUser} = require('../controllers/userController');

const router = express.Router();

// Définir les routes pour les utilisateurs
router.get('/', getAllUsers);
router.post('/', createUser);

module.exports = router;