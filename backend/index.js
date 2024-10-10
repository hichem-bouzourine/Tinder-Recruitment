// express server
const express = require('express');
const app = express();
const port = 3000;
const prisma = require('./prisma/prisma');

app.get('/', async (req, res) => {
    const users = await prisma.User.findMany();
    res.send(users);
}
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}
);

