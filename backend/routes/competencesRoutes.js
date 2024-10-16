const express = require('express');

const { getAllCompetences } = require('../controllers/competenceController');

const router = express.Router();

router.get('/', getAllCompetences);

module.exports = router;