// express server
const express = require('express');
const routes = require('./routes');
const authRoute = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors');
const candidatureRoutes = require('./routes/candidatureRoutes');

app.use(cors());

app.use(bodyParser.json());
app.use(express.json());

app.use('/api/candidature', candidatureRoutes);


const authenticateToken = require('./middleware/auth');
// Unprotected routes
app.use('/auth', authRoute);

// Protected routes is desactivated due to lack of time, but the middleware is working.
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Serveur en écoute sur le port http://localhost:${port}`);
});