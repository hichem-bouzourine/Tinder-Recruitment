const express = require('express');
const userRoutes = require('./userRoutes');
const offreRoutes = require('./offreRoutes');
const favoriRoutes = require('./favoriRoutes');
const authRoutes = require('./authRoutes');

const router = express.Router();

// Utiliser les routes utilisateur sous le préfixe /users
router.use('/users', userRoutes);
router.use('/offres', offreRoutes);
router.use('/favoris', favoriRoutes);
router.use('/auth', authRoutes);


module.exports = router;
