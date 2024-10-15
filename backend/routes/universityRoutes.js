const express = require('express');
const { createUniversite, deleteUniversite, getAllUniversites, getOneUniversite, getStudentsByUniversite, getUniversiteByName, updateUniversite } = require('../controllers/universityController');

const router = express.Router();

router.get('/', getAllUniversites);
router.get('/:id', getOneUniversite);
router.get('/nom/:nom', getUniversiteByName);
router.post('/', createUniversite);
router.put('/:id', updateUniversite);
router.delete('/:id', deleteUniversite);
router.get('/students/:id', getStudentsByUniversite);


module.exports = router;