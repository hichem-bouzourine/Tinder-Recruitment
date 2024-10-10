const express = require('express');
const userRoutes = require('./userRoutes'); 
const offreRoutes = require('./offrerRoutes'); 
const favoriRoutes = require('./favoriRoutes');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Utiliser les routes utilisateur sous le préfixe /users
router.use('/users', userRoutes);
router.use('/offres', authenticateToken, offreRoutes);
router.use('/favoris', authenticateToken, favoriRoutes); 


module.exports = router;
