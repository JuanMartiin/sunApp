const express = require('express');
const cors = require('cors');
const Joi = require('@hapi/joi');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/login', (req, res) => {
    res.send({
        email: req.body.email,
        password: req.body.password
    });
});

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

