const express = require('express');

const { getImage, uploadImage, uploadCV, getCV, getRecruiter, getAllUsers, updateUser, getEtudiant, updateEtudiant, updateRecruteur } = require('../controllers/userController');
const multer = require('multer');
const upload = multer({ dest: '../uploads/' });
const router = express.Router();

// Définir les routes pour les utilisateurs
router.get('/', getAllUsers);
router.put('/me', updateUser);
router.put('/etudiant/me/:id', updateEtudiant);
router.get('/etudiant/:id', getEtudiant);
router.put('/recruteur/me/:id', updateRecruteur);
router.get('/recruteur/:id', getRecruiter);
router.post('/etudiant/upload/:id', upload.single('file'), uploadCV);
router.get('/etudiant/cv/:id', getCV);
router.get('/image/:id', getImage);
router.post('/image/upload/:id', upload.single('file'), uploadImage);

module.exports = router;