# Autenticação via Keycloak com Node.js

Este projeto é um exemplo básico de como implementar autenticação via Keycloak usando Node.js e Express.

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado em sua máquina.
- Um servidor Keycloak configurado com um realm, client id e client secret.

## Configuração do Projeto

### 1. Clone o Repositório

Clone o repositório do projeto para sua máquina local:

```bash
git clone https://github.com/biaTrivNic/auth-keycloak-nodejs-api.git
```
### 2. Instale as Dependências

```bash
npm install
```
### 3. Configure o Arquivo de Variáveis de Ambiente

Faça uma cópia do arquivo .env.example e renomeie-a para .env. <br> Em seguida, ajuste as variáveis de ambiente conforme necessário.

### 4. Inicie o Servidor

```bash
node server.js
```
### 5. Teste o Fluxo de Autenticação

Para testar o fluxo de autenticação, abra seu navegador e acesse http://localhost:3000/.



