# Desafio Flit – Gestão de Funcionários

Aplicação web para cadastro e listagem de funcionários, desenvolvida como parte de desafio técnico.
O projeto é dividido em dois módulos: backend (API) e frontend (Vue.js).

## 🚀 Tecnologias utilizadas

Backend (API):

- Node.js + Express
- SQLite com Prisma ORM
- Express-Validator (validações)
- Arquitetura em camadas
- Seed inicial para criação de usuário padrão

Frontend:

- Vue 3 + Vite
- Axios
- Vuetify

## ⚙️ Funcionalidades

- Login com usuário padrão criado via seed (enviado por e-mail).
- Cadastro de funcionários com os seguintes dados:
  - Ativo
  - Foto
  - Nome
  - E-mail
  - Data de contratação
  - CPF
  - Endereço (Rua, CEP, Bairro, Cidade, Estado)
- Listagem de funcionários já cadastrados.

## Rodando localmente

Clonar o repositório

```bash
  git clone https://github.com/edsonbarcellos02/desafio-flit.git
  cd desafio-flit
```

Rodar o Backend

Criar o arquivo .env na raiz do projeto com os parâmetros

- PORT=8033
- TOKEN_SECRET

```bash
    cd backend
    npm install

    # gerar banco e rodar seed inicial
    npx prisma migrate dev --name init

    # Caso o usuario não seja criado junto com banco, execute
    npx prisma db seed

    # Para conferir se o usuário foi criado pode visualizar o banco
    npx prisma studio

    npm start
```

Rodar o Frontend

```bash
    cd frontend
    npm install
    npm run dev
```

## 🚀 Deploy

Hospedado em VPS privada, com ambiente configurado para rodar aplicações Node.js.

[![deploy](https://img.shields.io/badge/deploy-desafio.vivasoftwares.com.br-blue?style=for-the-badge&logo=vercel&logoColor=white)](https://desafio.vivasoftwares.com.br/)

## 📧 Usuário de acesso

Um usuário padrão é criado automaticamente via **seed do Prisma**.  
Os dados de acesso foram enviados no e-mail de resposta do desafio.
