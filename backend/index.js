// express server
const express = require('express');
const prisma = require('./prisma/prisma');
const routes = require('./routes');

const app = express();
const port = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Routes principales
app.use('/api', routes);

// Route de base pour vérifier le serveur
app.get('/', (req, res) => {
  res.send('Backend est opérationnel !');
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port http://localhost:${port}`);
});


