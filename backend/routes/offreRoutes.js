const express = require('express');
const { createOffre } = require('../controllers/offreController');
//const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Route pour créer une nouvelle offre (réservée aux recruteurs)
//router.post('/', authenticateToken, createOffre);

module.exports = router;
