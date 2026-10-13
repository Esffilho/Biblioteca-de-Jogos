CREATE DATABASE IF NOT EXISTS biblioteca_jogos
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE biblioteca_jogos;

CREATE TABLE IF NOT EXISTS game (
  id INT NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(150) NOT NULL,
  plataforma VARCHAR(100) NOT NULL,
  classificacao VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);
