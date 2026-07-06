# Database

Esta pasta contém todos os artefatos relacionados ao banco de dados.

## Estrutura

```
db/
├── migrations/
├── seeds/
├── schema.sql
└── README.md
```

## Migrations

As migrations representam alterações estruturais do banco de dados.

Exemplos:

- criação de tabelas
- alteração de colunas
- criação de índices
- criação de constraints

Toda alteração estrutural deve ser criada utilizando o dbmate.

Criar uma migration:

```bash
npm run db:new nome_da_migration
```

Aplicar migrations:

```bash
npm run db:migrate
```

Rollback:

```bash
npm run db:rollback
```

---

## Seeds

Os arquivos da pasta `seeds` são utilizados apenas para inserir dados iniciais em ambientes de desenvolvimento e testes.

Esses arquivos **não devem ser executados em produção**.

Exemplos:

- usuário administrador
- dados fictícios
- massa de testes

---

## Schema

O arquivo `schema.sql` representa o estado atual do banco.

Ele é atualizado automaticamente pelo dbmate.

Não deve ser editado manualmente.