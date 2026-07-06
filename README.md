# Backend (Projeto Educacional)

Descrição
- Aplicação Node.js mínima para demonstrar conexão com PostgreSQL e uso em contêiner Docker.
- Objetivo educacional: demonstração de infraestrutura com Docker e manipulação de banco de dados.

Tecnologias
- Node.js (ES Modules)
- PostgreSQL
- Docker
- Dependências: `dotenv`, `pg`

Estrutura do repositório
- `Dockerfile` - imagem Docker para executar a aplicação
- `index.js` - servidor HTTP e lógica de conexão com o banco
- `package.json` - metadados do projeto e dependências
- `db/script.sql` - script SQL para criar tabela `users` e inserir um usuário de exemplo

Requisitos
- Node.js 18+ (imagem usa `node:25-alpine`)
- PostgreSQL acessível (local ou remoto)
- `npm` (para instalação local)
- Docker (opcional, para executar em contêiner)

Variáveis de ambiente (obrigatórias)
- `PORT` — porta onde o servidor irá escutar (ex: `3000`)
- `DB_USER` — usuário do PostgreSQL
- `DB_PASSWORD` — senha do PostgreSQL
- `DB_HOST` — host do PostgreSQL (ex: `localhost` ou `db`)
- `DB_PORT` — porta do PostgreSQL (ex: `5432`)
- `DB_NAME` — nome do banco de dados

Exemplo de arquivo `.env`

```bash
PORT=3000
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mydb
```

Instalação e execução (local)

```bash
# Instalar dependências
npm install

# Criar .env com as variáveis acima
# Executar a aplicação
node index.js
```

Executando com Docker

```bash
# Build da imagem
docker build -t proj-backend .

# Executar (usando .env local)
docker run --rm -p 3000:3000 --env-file .env --name proj-backend proj-backend
```

Observação: `Dockerfile` expõe a porta 3000. Garanta que `PORT` no `.env` seja `3000` ou ajuste o mapeamento de portas.

Banco de dados
- O script SQL `db/script.sql` cria a tabela `users` e insere um usuário de exemplo (`admin`).
- Para aplicar o script num banco local (usando `psql`):

```bash
psql -h $DB_HOST -U $DB_USER -d $DB_NAME -f db/script.sql
```

Segurança e recomendações
- Não mantenha senhas em texto plano em commits. Use variáveis de ambiente ou segredos gerenciados.
- O `db/script.sql` insere uma senha em texto claro para fins educacionais — altere para usar senhas seguras e hashing (ex: `bcrypt`) em produção.
- Evite commitar o arquivo `.env`.

API
- Endpoint principal: `GET /api`
- Resposta JSON de exemplo:

```json
{
  "database": true,
  "userAdmin": true
}
```

Explicação rápida
- Ao acessar `/api` a aplicação tenta conectar ao PostgreSQL e consulta a tabela `users` retornando se houve conexão bem-sucedida e se o primeiro usuário possui `role === "admin"`.

Problemas comuns
- `PORT` não definido → o servidor não inicia. Defina `PORT` em `.env`.
- Erro de conexão com o Postgres → verifique `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_PORT`, `DB_NAME` e se o banco está acessível.

Contribuição
- Abra issues para bugs e melhorias.
- Crie PRs para correções e novas funcionalidades.

Licença
- `ISC` (definida em `package.json`)

Autor / Contato
- Cubos-DevOps

---

Se quiser, posso:
- Adicionar um `script` em `package.json` para iniciar a aplicação (`start`).
- Criar um `.dockerignore` e um `Makefile` com comandos úteis.
- Atualizar o `db/script.sql` para usar hash de senha.
