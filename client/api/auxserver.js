const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;
app.use(cors());
app.use(express.json());

app.post('/register', (req, res) => {
  res.send({email: req.body.email});
});

app.post('/login', (req, res) => {
  res.send({email: req.body.email});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});