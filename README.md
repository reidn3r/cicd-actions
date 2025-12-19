# Validator API

API desenvolvida em TypeScript utilizando Fastify para validação de CPF e CNPJ, focada em reproduzir conceitos de CI/CD e containerização.

## Visão Geral

Este projeto demonstra a implementação de uma pipeline de integração e entrega contínua (CI/CD) para uma aplicação Node.js. A aplicação é uma API REST construída com Fastify e TypeScript, incluindo testes unitários automatizados com Jest e injeção de dependências via Inversify.

## Pipeline de CI/CD

### Integração Contínua (CI)

O workflow de CI é acionado automaticamente em cada Pull Request, executando as seguintes etapas:

1. **Checkout do código**: Clona o repositório na branch alvo do PR
2. **Configuração do ambiente**: Prepara o ambiente Node.js versão 20
3. **Instalação de dependências**: Executa `npm install` para baixar todas as dependências do projeto
4. **Execução de testes**: Roda a suíte de testes unitários com Jest
5. **Build da aplicação**: Compila o código TypeScript para JavaScript

Este pipeline garante que apenas código que passa em todos os testes e compila com sucesso possa ser mergeado na branch principal

### Entrega Contínua (CD)

O workflow de CD é executado após cada push na branch `main` e consiste em dois jobs principais:

#### 1. Semantic Release

Automatiza o versionamento semântico e a geração de releases:

- Analisa as mensagens de commit seguindo a convenção Conventional Commits
- Determina automaticamente o próximo número de versão (major, minor ou patch)
- Cria uma nova tag e release no GitHub
- Nova tag é usada no verisonamento da imagem do container enviada ao container registry

#### 2. Push para Container Registry

Consiste das seguintes etapas:

- Recupera a versão da release mais recente via GitHub API
- Faz autenticação no Docker Hub por secrets gerenciados no GitHub 
- Constrói a imagem Docker utilizando build multi-stage
- Faz push da imagem para o Docker Hub com a tag da versão correspondente

### Build Multi-Stage do Docker

O Dockerfile implementa uma estratégia de build em múltiplas etapas para otimizar o tamanho final da imagem:

**Estágio 1 - Build**
- Base: `node:20-alpine`
- Copia todo o código fonte
- Instala todas as dependências (incluindo devDependencies)
- Compila o código TypeScript

**Estágio 2 - Produção**
- Base: `node:20-alpine`
- Copia apenas os arquivos essenciais do estágio de build
- Instala apenas dependências de produção (`--omit=dev`)
- Resulta em uma imagem menor

### Versionamento Automático

O projeto utiliza Semantic Release com as seguintes configurações:

- **Commit Analyzer**: Determina o tipo de versão baseado nos commits
- **Release Notes Generator**: Gera changelog automaticamente
- **GitHub Plugin**: Cria releases no GitHub
- **Git Plugin**: Commita as alterações de versão no repositório

## GitHub Actions Utilizadas

| Action | Descrição | Marketplace |
|--------|-----------|-------------|
| `actions/checkout@v6` | Realiza o checkout do código do repositório para o runner | [Link](https://github.com/marketplace/actions/checkout) |
| `actions/setup-node@v6` | Configura o ambiente Node.js com a versão especificada | [Link](https://github.com/marketplace/actions/setup-node-js-environment) |
| `docker/login-action@v3` | Autentica no Docker Hub ou outros registries de containers | [Link](https://github.com/marketplace/actions/docker-login) |
| `docker/build-push-action@v5` | Constrói e faz push de imagens Docker para registries | [Link](https://github.com/marketplace/actions/build-and-push-docker-images) |

## Tecnologias Utilizadas

- **Runtime**: Node.js 20
- **Framework**: Fastify
- **Linguagem**: TypeScript
- **Testes**: Jest
- **Injeção de Dependências**: Inversify
- **Containerização**: Docker
- **CI/CD**: GitHub Actions
- **Versionamento**: Semantic Release

## Configuração de Secrets

Para o funcionamento completo dos workflows, foram configurados os seguintes secrets no repositório:

- `GITHUB_TOKEN` - Token automático fornecido pelo GitHub Actions
- `DOCKERHUB_USERNAME` - Nome de usuário do Docker Hub
- `DOCKERHUB_PW` - Token de acesso do Docker Hub
