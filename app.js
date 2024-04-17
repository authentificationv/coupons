const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');

// impoter variable d'environement
require('dotenv').config();
// console.log(process.env);

const userRoutes = require('./routes/user');
const path = require('path');

// Configuration for mongoDB
const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connexion à mongoDB réussie !'))
  .catch((error) => console.log({ error }));
const app = express();

const auth = require('./middleware/auth');

//CORS Config
const corsOpts = {
  origin: '*',

  methods: ['GET', 'POST'],

  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOpts));
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PUT, DELETE, PATCH, OPTIONS'
//   );
//   next();
// });

app.use(bodyParser.json());

app.get('/', auth);
app.use('/api/auth/', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

// app.get('/', (req, res) => {
//   res.send('Hello, this is the homepage!');
// });

module.exports = app;
