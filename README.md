# Backend (Projeto Educacional)

## Visão geral

Aplicação Node.js simples que expõe um endpoint HTTP e consulta um banco PostgreSQL. A arquitetura segue uma separação básica entre configuração, roteamento, controlador, serviço e repositório.

O objetivo do projeto é educacional: demonstrar como conectar um servidor Node a um banco de dados PostgreSQL e como organizar o código em camadas.

## Tecnologias

- Node.js (ES Modules)
- PostgreSQL
- Docker
- `dotenv` para variáveis de ambiente
- `pg` para conexão com o PostgreSQL

## Estrutura de pastas e arquivos

```text
.
├── .env
├── Dockerfile
├── README.md
├── index.js
├── package.json
├── config/
│   └── database.js
├── controllers/
│   └── userController.js
├── repositories/
│   └── userRepository.js
├── routes/
│   └── api.js
├── services/
│   └── userService.js
├── scripts/
│   └── script.sql
└── node_modules/
```

### Arquivos principais

- `index.js`
  - Ponto de entrada da aplicação.
  - Cria o servidor HTTP com `http.createServer(router)`.
  - Antes de iniciar, verifica a conexão com o banco de dados via `pool.query("SELECT NOW()")`.
  - Escuta a porta definida em `PORT`.

- `config/database.js`
  - Configura e exporta um pool de conexões PostgreSQL usando `pg.Pool`.
  - Carrega variáveis de ambiente com `dotenv.config()`.

- `routes/api.js`
  - Define o roteamento para requisições HTTP.
  - Roteia apenas `GET /api` para o controlador `api`.
  - Retorna `404 Not Found` para outras rotas.

- `controllers/userController.js`
  - Define a função `api(req, res)` que trata a requisição ao endpoint.
  - Chama o serviço `getUserInfo()` e formata a resposta JSON.
  - Retorna erro `500` se houver falha na lógica.

- `services/userService.js`
  - Contém a lógica de negócio para recuperar informações do usuário.
  - Invoca `getFirstUser()` do repositório e monta o objeto de resposta.
  - Retorna os campos:
    - `database`: sempre `true` quando a consulta ocorre com sucesso
    - `userAdmin`: `true` quando o primeiro usuário tem `role === "admin"`
    - `user`: atualmente mapeia `user?.name`, mas o repositório traz `username`

- `repositories/userRepository.js`
  - Faz a query SQL direta `SELECT * FROM users LIMIT 1`.
  - Retorna o primeiro registro do usuário.

- `scripts/script.sql`
  - Cria a tabela `users` com colunas `id`, `username`, `password` e `role`.
  - Insere um usuário de exemplo com `role = 'admin'`.

## Requisitos

- Node.js 18+ (imagem Docker usa `node:25-alpine`)
- PostgreSQL acessível
- `npm` para instalar dependências
- Docker para executar em contêiner (opcional)

## Variáveis de ambiente

O projeto depende das seguintes variáveis em um arquivo `.env` ou no ambiente:

- `PORT` — porta onde o servidor escuta, ex: `3000`
- `DB_USER` — usuário do PostgreSQL
- `DB_PASSWORD` — senha do PostgreSQL
- `DB_HOST` — host do PostgreSQL, ex: `localhost` ou `db`
- `DB_PORT` — porta do PostgreSQL, ex: `5432`
- `DB_NAME` — nome do banco de dados

Exemplo de `.env`:

```env
PORT=3000
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mydb
```

## Execução local

```bash
npm install
node index.js
```

## Execução com Docker

```bash
docker build -t proj-backend .
docker run --rm -p 3000:3000 --env-file .env --name proj-backend proj-backend
```

> O `Dockerfile` expõe a porta `3000`. Ajuste `PORT` ou o mapeamento de portas se necessário.

## Banco de dados

O script SQL de inicialização está em `scripts/script.sql`.

Para criar a tabela e inserir o usuário de exemplo em um banco local:

```bash
psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -f scripts/script.sql
```

## Endpoint da API

- `GET /api`
- Resposta esperada:

```json
{
  "database": true,
  "userAdmin": true,
  "user": null
}
```

> Observação: o campo `user` é definido no serviço como `user?.name`, mas a query retorna `username`. Por isso, nesse código atual, ele pode ficar `null`.

## Fluxo de execução

1. `index.js` inicia o servidor e confirma a conexão com o banco.
2. Requisições chegam em `routes/api.js`.
3. O controlador em `controllers/userController.js` chama o serviço `getUserInfo()`.
4. O serviço em `services/userService.js` obtém o primeiro usuário via `repositories/userRepository.js`.
5. O repositório usa o pool do banco exportado por `config/database.js`.

## Observações importantes

- Não comite o arquivo `.env` com credenciais reais.
- O `scripts/script.sql` usa senha de exemplo em texto claro apenas para demonstração.
- Em produção, recomenda-se hashing de senha e tratamento de erros mais robusto.

