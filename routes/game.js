const express = require('express');
const pool = require('../config/database');

const router = express.Router();

function isValidId(id) {
  return /^\d+$/.test(id) && Number(id) > 0;
}

router.get('/', (req, res) => {
  pool.getConnection((connectionError, connection) => {
    if (connectionError) {
      return res.status(500).json({
        error: 'Não foi possível conectar ao banco de dados'
      });
    }

    connection.query(
      'SELECT id, titulo, plataforma, classificacao FROM game ORDER BY id',
      (queryError, results) => {
        connection.release();

        if (queryError) {
          return res.status(500).json({
            error: 'Não foi possível consultar os jogos'
          });
        }

        return res.status(200).json(results);
      }
    );
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json({
      error: 'O ID deve ser um número inteiro positivo'
    });
  }

  pool.getConnection((connectionError, connection) => {
    if (connectionError) {
      return res.status(500).json({
        error: 'Não foi possível conectar ao banco de dados'
      });
    }

    connection.query(
      'SELECT id, titulo, plataforma, classificacao FROM game WHERE id = ?',
      [Number(id)],
      (queryError, results) => {
        connection.release();

        if (queryError) {
          return res.status(500).json({
            error: 'Não foi possível consultar o jogo'
          });
        }

        if (results.length === 0) {
          return res.status(404).json({
            error: 'Jogo não encontrado'
          });
        }

        return res.status(200).json(results[0]);
      }
    );
  });
});

module.exports = router;
