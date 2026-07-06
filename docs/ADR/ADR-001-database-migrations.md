# ADR-001 — Escolha da ferramenta de migração de banco de dados

- **Status:** Aceito
- **Data:** 2026-07-06

## Contexto

A aplicação utiliza PostgreSQL como banco de dados e será implantada futuramente na AWS utilizando Amazon RDS.

Inicialmente o banco era criado através da execução manual do arquivo `db/script.sql`.

Essa abordagem apresenta limitações:

- Não existe controle de versão das alterações do banco.
- Não há histórico das mudanças.
- Não existe rastreabilidade das migrações executadas.
- Dificulta automações em CI/CD.
- Não escala para múltiplos ambientes.

Foi necessário adotar uma ferramenta de migração.

---

## Opções avaliadas

### Script SQL manual

**Prós**

- Simples
- Nenhuma ferramenta adicional

**Contras**

- Sem versionamento
- Sem controle de execução
- Não recomendado para CI/CD

---

### Flyway

**Prós**

- Muito utilizado em empresas
- Excelente integração com CI/CD
- Suporte a diversos bancos

**Contras**

- Mais complexo
- Dependência do ecossistema Java
- Recursos avançados pagos

---

### Liquibase

**Prós**

- Muito completo
- Rollback avançado

**Contras**

- Curva de aprendizado elevada
- Configuração mais complexa

---

### Prisma Migrate

**Prós**

- Excelente integração com Node.js

**Contras**

- Acopla a aplicação ao Prisma ORM

---

### Knex Migrations

**Prós**

- Bastante utilizado em projetos Node.js

**Contras**

- Adiciona uma camada de abstração desnecessária para este projeto

---

### dbmate

**Prós**

- Utiliza SQL puro
- Simples
- Leve
- Independente de ORM
- Funciona com PostgreSQL
- Compatível com Docker
- Compatível com GitHub Actions
- Compatível com Amazon RDS
- Fácil manutenção

**Contras**

- Menor adoção que Flyway

---

## Decisão

Foi escolhida a utilização do **dbmate**.

A decisão foi baseada na simplicidade da ferramenta e na compatibilidade com os objetivos do projeto.

Como o foco principal deste projeto é DevOps, Infraestrutura como Código e CI/CD, optou-se por utilizar uma ferramenta leve que permita escrever SQL puro, evitando dependências desnecessárias.

---

## Consequências

### Positivas

- Banco versionado
- Migrações reproduzíveis
- Fácil integração com GitHub Actions
- Fácil utilização no Amazon RDS
- SQL continua sendo a linguagem principal

### Negativas

- Menor adoção no mercado quando comparado ao Flyway
- Necessidade de instalar um binário adicional

---

## Revisão

Esta decisão poderá ser revisada futuramente caso a aplicação evolua para utilização de um ORM.