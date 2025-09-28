const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// --- CORS ---
const corsOptions = {
  origin: [
    'http://localhost:3000', // ton front en local
    'https://authentification-coupon.onrender.com', // ton front en prod
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// --- Body parser ---
app.use(bodyParser.json());

// --- MongoDB ---
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connexion à mongoDB réussie !'))
  .catch((error) => console.log({ error }));

// --- Routes ---
app.get('/hello', (req, res) => {
  res.send('hello');
});

const baseRoutes = require('./routes/ticket');
app.use('/api/loan', baseRoutes);

module.exports = app;
