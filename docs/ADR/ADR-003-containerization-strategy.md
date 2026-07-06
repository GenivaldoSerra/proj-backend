# ADR-003 — Estratégia de Containerização

- **Status:** Aceito
- **Data:** 2026-07-06

---

# Contexto

A aplicação Node.js será utilizada como aplicação de referência para um projeto focado em práticas de DevOps.

Nas próximas fases do projeto serão implementados:

- Docker Compose para ambiente de desenvolvimento;
- GitHub Actions para Integração Contínua;
- Amazon RDS PostgreSQL;
- Amazon ECS;
- Amazon EKS;
- Observabilidade com Prometheus e Grafana.

Para garantir consistência entre os ambientes de desenvolvimento, homologação e produção, decidiu-se executar a aplicação dentro de containers Docker.

---

# Problema

Executar a aplicação diretamente na máquina do desenvolvedor pode gerar inconsistências, como:

- diferenças de versões do Node.js;
- dependências instaladas localmente;
- diferenças entre sistemas operacionais;
- dificuldade para reproduzir ambientes.

Além disso, a futura pipeline de CI/CD deverá construir exatamente a mesma imagem utilizada nos ambientes de execução.

---

# Decisão

A aplicação será distribuída através de uma imagem Docker.

A estratégia adotada seguirá os seguintes princípios:

- um único Dockerfile para construir a aplicação;
- separação entre construção da imagem e orquestração dos serviços;
- utilização do Docker Compose apenas para ambientes locais de desenvolvimento;
- preparação para execução futura em serviços como Amazon ECS e Kubernetes.

O Dockerfile permanecerá na raiz do projeto, enquanto arquivos de orquestração e configurações relacionadas ao Docker serão organizados na pasta `docker/`.

Estrutura prevista:

```text
Dockerfile
.dockerignore

docker/
├── compose.dev.yml
├── compose.prod.yml
└── README.md
```

---

# Alternativas consideradas

## Executar a aplicação diretamente na máquina

### Vantagens

- configuração simples;
- nenhuma ferramenta adicional.

### Desvantagens

- ambientes inconsistentes;
- difícil reprodução;
- diferenças entre desenvolvedores;
- incompatível com a estratégia de deploy planejada.

---

## Docker Compose como única solução

### Vantagens

- ambiente completo rapidamente.

### Desvantagens

- não substitui a necessidade de um Dockerfile;
- não é utilizado em ambientes Kubernetes;
- mistura construção da imagem com orquestração.

---

## Dockerfile + Docker Compose

### Vantagens

- separação clara de responsabilidades;
- reutilização da mesma imagem em diferentes ambientes;
- alinhado com práticas modernas de DevOps;
- preparação para GitHub Actions;
- preparação para Amazon ECS e Kubernetes.

### Desvantagens

- pequena complexidade inicial.

---

# Consequências

## Positivas

- ambiente reproduzível;
- isolamento das dependências;
- facilidade para CI/CD;
- preparação para ambientes cloud;
- mesma imagem utilizada em desenvolvimento e produção.

## Negativas

- necessidade de aprender Docker;
- aumento do tempo de build da aplicação;
- necessidade de gerenciamento de imagens.

---

# Escopo

Esta ADR define apenas a estratégia geral de containerização.

Detalhes como:

- Multi-stage Build;
- Healthcheck;
- Docker Compose;
- Usuário não-root;
- Hardening da imagem;

serão documentados em ADRs futuras, caso sejam necessárias.

---

# Revisão

Esta decisão poderá ser revisada caso a arquitetura da aplicação seja alterada significativamente ou novas necessidades de infraestrutura sejam identificadas.