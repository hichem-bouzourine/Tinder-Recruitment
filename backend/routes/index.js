const express = require('express');
const userRoutes = require('./userRoutes'); 
const offreRoutes = require('./offrerRoutes'); 

const router = express.Router();

// Utiliser les routes utilisateur sous le préfixe /users
router.use('/users', userRoutes);
router.use('/offres', offreRoutes);

module.exports = router;
