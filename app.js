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

app.use((error, req, res, next) => {
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({
      error: 'O corpo da requisição contém JSON inválido'
    });
  }

  console.error(error);

  return res.status(500).json({
    error: 'Erro interno do servidor'
  });
});

module.exports = app;
