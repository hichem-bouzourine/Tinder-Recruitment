const prisma = require('../prisma/prisma');

//Obtenir tous les utilisateurs
const getAllUsers = async (req, res) => {
    try{
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json({err : "Erreur lors de la recuperation des utilisateurs"});
    }
};

//Creer un nouvel utilisateur
const createUser = async (req, res) => {
    const {username, password, role } = req.body;
    try{
        const newUser = await prisma.user.create({
            data: {
                username, password, role
            },
        });

    if (role === 'etudiant') {
      // Créer un étudiant lié à l'utilisateur
        await prisma.etudiant.create({
        data: {
          userId: newUser.id,
          nom: '', //vide pour l'instant
          prenom: '',
          dateNaissance: new Date(),
          anneeEtude: '',
          skills: [], 
          favorites: [], // Liste vide par défaut
        },
      });
    } else if (role === 'recruteur') {
      // Créer un recruteur lié à l'utilisateur
      additionalData = await prisma.recruteur.create({
        data: {
          userId: newUser.id,
          nom: '',
          prenom: '',
          poste: '',
          listeOffres: [],
        },
      });
    }
        res.status(201).json(newUser);
    }catch (err){
        if (err.code === 'P2002' && err.meta.target.includes('username')) {
            res.status(400).json({ error: 'Le nom d\'utilisateur est déjà pris, veuillez en choisir un autre.' });
          } else {
            res.status(500).json({ err: 'Erreur lors de la création de l\'utilisateur.' });
          }
    }
}

//Creer un nouvel utilisateur
const updateUser = async (req, res) => {
    const {username, password, role } = req.body;
    const userId = req.user.id; //Recupere id a partir des infos du token
    try {
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: {
            username,
            password,
            role,
          },
        });
        res.status(200).json(updatedUser);
      } catch (error) {
        if (error.code === 'P2002' && error.meta.target.includes('username')) {
          res.status(400).json({ error: 'Le nom d\'utilisateur est déjà pris, veuillez en choisir un autre.' });
        } else if (error.code === 'P2025') {
          res.status(404).json({ error: 'Utilisateur non trouvé.' });
        } else {
          res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur.' });
        }
      }
}

// Mettre à jour les informations d'un étudiant
const updateEtudiant = async (req, res) => {
    const userId = req.user.id; // Récupérer l'ID de l'utilisateur connecté à partir du token JWT
    const { nom, prenom, dateNaissance, anneeEtude, skills, universiteNom } = req.body;
  
    try {
        // Chercher l'université par nom
    const universite = await prisma.universite.findUnique({
        where: { nom: universiteNom },
      });
  
      if (!universite) {
        return res.status(404).json({ error: 'Université non trouvée.' });
      }

      // Mettre à jour les informations de l'étudiant
      const updatedEtudiant = await prisma.etudiant.update({
        where: { userId: userId },
        data: {
          nom: nom || undefined,
          prenom: prenom || undefined,
          dateNaissance: dateNaissance ? new Date(dateNaissance) : undefined,
          anneeEtude: anneeEtude || undefined,
          skills: skills || undefined,
          universite: {connect: { id: universite.id }},
        },
      });
  
      res.status(200).json(updatedEtudiant);
    } catch (error) {
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Étudiant non trouvé.' });
      } else {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'étudiant.' });
      }
    }
  };

// Mettre à jour les informations d'un recruteur
const updateRecruteur = async (req, res) => {
    const userId = req.user.id; // Récupérer l'ID de l'utilisateur connecté à partir du token JWT
    const { nom, prenom, poste, entrepriseNom} = req.body;
  
    try {
        // Chercher l'entreprise par nom
    const entreprise = await prisma.entreprise.findUnique({
        where: { nom: entrepriseNom },
      });
  
      if (!entreprise) {
        return res.status(404).json({ error: 'Entreprise non trouvée.' });
      }

      // Mettre à jour les informations du recruteur
      const updatedRecruteur = await prisma.recruteur.update({
        where: { userId: userId },
        data: {
          nom: nom || undefined,
          prenom: prenom || undefined,
          poste: poste || undefined,
          entreprise: { connect: { id: entreprise.id } },
        },
      });
  
      res.status(200).json(updatedRecruteur);
    } catch (error) {
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Recruteur non trouvé.' });
      } else {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du recruteur.' });
      }
    }
  };


module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    updateEtudiant, 
    updateRecruteur,
  };

