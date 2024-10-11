// express server
const express = require('express');
const routes = require('./routes');
const authRoute = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(express.json());


const authenticateToken = require('./middleware/auth');
// Unprotected routes
app.use('/auth', authRoute);

// Protected routes
app.use('/api', authenticateToken, routes);

app.listen(port, () => {
    console.log(`Serveur en écoute sur le port http://localhost:${port}`);
});