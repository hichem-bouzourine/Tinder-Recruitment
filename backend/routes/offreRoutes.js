const express = require('express');
const { createOffre, getAllOffres, getRecruiterOffers } = require('../controllers/offreController');
const router = express.Router();

// Route pour créer une nouvelle offre
router.post('/', createOffre);
router.get('/', getAllOffres);
router.get('/recruiter/:id', getRecruiterOffers);

module.exports = router;
