const express = require('express');
const { createOffre } = require('../controllers/offreController');
const router = express.Router();

// Route pour créer une nouvelle offre
router.post('/', createOffre);

module.exports = router;
