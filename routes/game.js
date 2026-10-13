const express = require('express');
const pool = require('../config/database');

const router = express.Router();

function isValidId(id) {
  return /^\d+$/.test(id) && Number(id) > 0;
}

function validateGameData(body) {
  const fields = ['titulo', 'plataforma', 'classificacao'];
  const values = {};

  for (const field of fields) {
    if (typeof body[field] !== 'string' || body[field].trim() === '') {
      return `O campo ${field} é obrigatório e deve ser um texto não vazio`;
    }

    values[field] = body[field].trim();
  }

  if (values.titulo.length > 150) {
    return 'O campo titulo deve ter no máximo 150 caracteres';
  }

  if (values.plataforma.length > 100) {
    return 'O campo plataforma deve ter no máximo 100 caracteres';
  }

  if (values.classificacao.length > 30) {
    return 'O campo classificacao deve ter no máximo 30 caracteres';
  }

  return null;
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

router.post('/', (req, res) => {
  const validationError = validateGameData(req.body);

  if (validationError) {
    return res.status(400).json({
      error: validationError
    });
  }

  const { titulo, plataforma, classificacao } = req.body;

  pool.getConnection((connectionError, connection) => {
    if (connectionError) {
      return res.status(500).json({
        error: 'Não foi possível conectar ao banco de dados'
      });
    }

    connection.query(
      'INSERT INTO game (titulo, plataforma, classificacao) VALUES (?, ?, ?)',
      [titulo.trim(), plataforma.trim(), classificacao.trim()],
      (queryError, result) => {
        connection.release();

        if (queryError) {
          return res.status(500).json({
            error: 'Não foi possível cadastrar o jogo'
          });
        }

        return res.status(201).json({
          id: result.insertId,
          titulo: titulo.trim(),
          plataforma: plataforma.trim(),
          classificacao: classificacao.trim()
        });
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
