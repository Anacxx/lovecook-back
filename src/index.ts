const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRouter = require('./router/userRouter').userRouter;
const recipeRouter = require('./router/recipeRouter').recipeRouter;
const commentRouter = require('./router/commentRouter').commentRouter;

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use("/users", userRouter);
app.use("/recipes", recipeRouter);
app.use("/comments", commentRouter);

const PORT = Number(process.env.PORT) || 3003;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
