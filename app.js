const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const gameRoutes = require('./routes/game');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/game', gameRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada'
  });
});

module.exports = app;
