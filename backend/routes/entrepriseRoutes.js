const express = require('express');
const { getAllEntreprises, getEntrepriseByName, getOneEntreprise, createEntreprise, updateEntreprise, deleteEntreprise, getRecruteursByEntreprise } = require('../controllers/entrepriseController');

const router = express.Router();

router.get('/', getAllEntreprises);
router.get('/:id', getOneEntreprise);
router.get('/nom/:nom', getEntrepriseByName);
router.post('/', createEntreprise);
router.put('/:id', updateEntreprise);
router.delete('/:id', deleteEntreprise);
router.get('/recruteurs/:id', getRecruteursByEntreprise);


module.exports = router;