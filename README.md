# 🍽️ **LoveCook**

## 📖 **Visão Geral**
O **Projeto de Receitas** é uma API desenvolvida para permitir que usuários criem contas, efetuem login, compartilhem receitas, adicionem comentários, favoritem receitas, entre outras funcionalidades. Este projeto foi construído com tecnologias robustas, como **Node.js**, **TypeScript** e **Express**, oferecendo uma estrutura sólida para gerenciar receitas de maneira interativa.

---

## 🛠️ **Pré-requisitos**
Antes de começar, verifique se você possui os seguintes pré-requisitos instalados em sua máquina:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **Banco de Dados SQL**: Ex.: SQLite, MySQL ou PostgreSQL.
- **Postman**: Para testar a API: [Download Postman](https://www.postman.com/)

---

## ⚙️ **Configuração**

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/Anacxx/lovecook-back
2. **Acesse o diretório do projeto:**
   ```bash
   cd lovecook-back
3. **Instale as dependências e construa o projeto:**  
    ```bash
    npm install && npm run build
4. **Configure as variáveis de ambiente:**  
    ```bash
    cp .env.example .env
5. **Edite o arquivo .env com as informações do seu banco de dados e segredos (por exemplo, JWT secret).** 
6. **Inicie o servidor** 
    ```bash
    npm run start

Uso da API
🧑‍💻 **Endpoints de Usuário**
/signup - Criação de um novo usuário.
/login - Autenticação de um usuário.
🍴 **Endpoints de Receita**
/addRecipe - Adicionar uma nova receita (autenticado).
/getAllRecipes - Obter todas as receitas.
/getRecipeById/{id} - Obter receita por ID.
/favoritesByUserId - Obter receitas favoritas de um usuário.
/addFavorites - Adicionar receita aos favoritos (autenticado).
/deleteFavorites - Remover receita dos favoritos (autenticado).
💬 **Endpoints de Comentário**
/addComment - Adicionar um comentário a uma receita (autenticado).
/getCommentsByRecipeId/{id} - Obter comentários de uma receita por ID.

💻 **Tecnologias Utilizadas**
As principais tecnologias e ferramentas utilizadas no desenvolvimento deste projeto são:

Node.js: Plataforma de desenvolvimento.
TypeScript: Linguagem de programação utilizada.
Express: Framework para construção da API.
SQL e Knex: Gerenciamento e construção de queries SQL.
Hashing: Utilizado para proteger senhas de usuários.
JWT (JSON Web Token): Autenticação e autorização via tokens.
POO (Programação Orientada a Objetos): Estruturação do projeto utilizando paradigmas de POO.
