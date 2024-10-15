const prisma = require('../prisma/prisma');
const jwt = require('jsonwebtoken');

//Obtenir tous les utilisateurs
const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ err: "Erreur lors de la recuperation des utilisateurs" });
    }
};

//Creer un nouvel utilisateur
const createUser = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const newUser = await prisma.user.create({
            data: {
                email,
                password,
                role
            },
        });

        if (role === 'STUDENT') {
            const { universiteId, nom, prenom, dateNaissance, anneeEtude, competences } = req.body;

            if (!universiteId) {
                return res.status(400).json({ error: 'University ID is required for students.' });
            }

            // Créer un étudiant lié à l'utilisateur
            const newEtudiant = await prisma.etudiant.create({
                data: {
                    nom: nom || '',
                    prenom: prenom || '',
                    dateNaissance: dateNaissance ? new Date(dateNaissance) : null,
                    anneeEtude: anneeEtude || null,
                    universite: {
                        connect: { id: universiteId }
                    },
                    user: {
                        connect: { id: newUser.id } // Use relation to connect the user
                    }
                },
            });

            // Connect competences through EtudiantCompetence join table
            if (competences && competences.length > 0) {
                await prisma.etudiantCompetence.createMany({
                    data: competences.map((competence) => ({
                        etudiantId: newEtudiant.id,
                        competenceId: competence.id
                    })),
                });
            }

        } else if (role === 'RECRUITER') {
            const { entrepriseId, nom, prenom, poste } = req.body;

            // Créer un recruteur lié à l'utilisateur
            await prisma.recruteur.create({
                data: {
                    nom: nom,
                    prenom: prenom,
                    poste: poste,
                    entreprise: entrepriseId && {
                        connect: { id: entrepriseId }
                    },
                    user: {
                        connect: { id: newUser.id } // Use relation to connect the user
                    }
                },
            });
        }
        res.status(201).json(newUser);
    } catch (err) {
        console.log(err);
        if (err.code === 'P2002' && err.meta.target.includes('username')) {
            res.status(400).json({ error: 'Le nom d\'utilisateur est déjà pris, veuillez en choisir un autre.' });
        } else {
            res.status(500).json({ err: 'Erreur lors de la création de l\'utilisateur.' });
        }
    }
};



//Connexion de l'utilisateur 
const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect.' });
        }
        // Créer un token JWT
        // const token = jwt.sign(
        //     {
        //         id: user.id, // Inclure l'ID de l'utilisateur dans le payload
        //         username: user.username,
        //         role: user.role,
        //     },
        //     process.env.JWT_SECRET, // Clé secrète pour signer le token
        //     {
        //         expiresIn: '1h', // Expirer le token après 24 heures
        //     }
        // );
        res.status(200).json(user);
    } catch (err) {
        console.log(err);

        res.status(500).json({ err: 'Erreur lors de la connexion' });

    }
}

//Creer un nouvel utilisateur
const updateUser = async (req, res) => {
    const { username, password, role } = req.body;
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
                universite: { connect: { id: universite.id } },
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
    const { nom, prenom, poste, entrepriseNom } = req.body;

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
    loginUser,
    updateUser,
    updateEtudiant,
    updateRecruteur,
};

