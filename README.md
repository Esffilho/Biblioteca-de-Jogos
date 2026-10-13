# Biblioteca de Jogos

API REST para cadastro e gerenciamento de jogos, desenvolvida com Node.js, Express e MySQL/MariaDB.

## Tecnologias

- Node.js
- Express
- MySQL/MariaDB
- `mysql`
- Morgan
- body-parser
- CORS
- nodemon

O projeto usa o pacote `mysql` conforme definido nos requisitos. Não utiliza `mysql2`, ORM ou frontend.

## Requisitos

- Node.js instalado
- MySQL 8 ou MariaDB em execução
- npm

## Instalação

Clone o repositório e instale as dependências:

```bash
npm install
```

Copie `.env.example` para `.env` e ajuste os valores para o seu ambiente:

```env
PORT=3000
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=seu_usuario
MYSQL_PASSWORD=sua_senha
MYSQL_DATABASE=biblioteca_jogos
```

Não versionar o arquivo `.env`.

## Banco de dados

Execute o script `database/schema.sql` no MySQL ou MariaDB:

```bash
mysql -u seu_usuario -p < database/schema.sql
```

O script cria o banco `biblioteca_jogos` e a tabela `game` com os campos:

- `id`
- `titulo`
- `plataforma`
- `classificacao`

## Execução

Para iniciar em modo normal:

```bash
npm start
```

Para iniciar com reinício automático durante o desenvolvimento:

```bash
npm run dev
```

Por padrão, a API fica disponível em `http://localhost:3000`.

## Rotas

### Listar jogos

```http
GET /game
```

### Consultar um jogo

```http
GET /game/:id
```

### Cadastrar um jogo

```http
POST /game
Content-Type: application/json
```

```json
{
  "titulo": "Elden Ring",
  "plataforma": "PC",
  "classificacao": "16 anos"
}
```

### Atualizar um jogo

```http
PUT /game/:id
Content-Type: application/json
```

```json
{
  "titulo": "Elden Ring atualizado",
  "plataforma": "PC",
  "classificacao": "16 anos"
}
```

### Excluir um jogo

```http
DELETE /game/:id
```

Essa requisição não precisa de body nem do header `Content-Type`.

## Respostas e validações

- `200`: consulta, atualização ou exclusão realizada.
- `201`: jogo cadastrado.
- `400`: dados inválidos, ID inválido, body ausente ou JSON malformado.
- `404`: rota ou jogo não encontrado.
- `500`: falha de conexão ou operação no banco.

Os campos `titulo`, `plataforma` e `classificacao` são obrigatórios e devem ser textos não vazios. Os limites são 150, 100 e 30 caracteres, respectivamente.

## Testes manuais

1. Inicie o MySQL/MariaDB.
2. Execute `npm install`.
3. Configure o `.env`.
4. Execute `npm start` ou `npm run dev`.
5. Use a coleção `postman/biblioteca-de-jogos.postman_collection.json`.
6. Confirme o cadastro com `POST`, consulte com `GET`, altere com `PUT` e remova com `DELETE`.

Também é possível consultar a API com:

```bash
curl http://localhost:3000/game
```

## Segurança e arquivos locais

Credenciais devem permanecer somente no `.env`, que está listado no `.gitignore`. A pasta `node_modules` também não deve ser versionada.
