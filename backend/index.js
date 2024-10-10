// express server
const express = require('express');
const app = express();
const port = 3000;
const prisma = require('./prisma/prisma');
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const dotenv = require('dotenv');
dotenv.config();


app.get('/', async (req, res) => {
    const users = await prisma.User.findMany();
    res.send(users);
}
);

// TODO: Move this endpoint to /routes
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma.User.findUnique({
        where: {
            username: username,
        },
    });
    if (!user) {
        return res.status(400).send('User not found');
    }
    if (user.password !== password) {
        return res.status(400).send('Password is incorrect');
    }
    const token = jwt.sign({
        username: user.username,
    }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
        token: token,
    });
}
);

// Test API to check auth token
app.get('/users', async (req, res) => {
    const users = await prisma.User.findMany();
    res.send({
        ...users,
        message: 'This is ' + user + ' profile',
    });
}
);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}
);

