const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const bodyParser = require('body-parser');

// impoter variable d'environement
require('dotenv').config();
// console.log(process.env);

// Configuration for mongoDB
const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connexion à mongoDB réussie !'))
  .catch((error) => console.log({ error }));

const loanRoutes = require('./routes/loan');

app.use(bodyParser.json());

// Route pour renvoyer "hello"
app.get('/hello', (req, res) => {
  res.send('hello');
});

app.use('/api/loan/', loanRoutes);

module.exports = app;
