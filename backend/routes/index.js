const express = require('express');
const userRoutes = require('./userRoutes');
const offreRoutes = require('./offreRoutes');
const favoriRoutes = require('./favoriRoutes');
const authRoutes = require('./authRoutes');
const entrepriseRoutes = require('./entrepriseRoutes');
const candidatureRoutes = require('./candidatureRoutes');
const competencesRoutes = require('./competencesRoutes');
const universityRoutes = require('./universityRoutes');

const router = express.Router();

// Utiliser les routes utilisateur sous le préfixe /users
router.use('/users', userRoutes);
router.use('/offers', offreRoutes);
router.use('/favoris', favoriRoutes);
router.use('/entreprises', entrepriseRoutes);
router.use('/auth', authRoutes);
router.use('/candidatures', candidatureRoutes);
router.use("/competences", competencesRoutes)
router.use("/universities", universityRoutes)


module.exports = router;
