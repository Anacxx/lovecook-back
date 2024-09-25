import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { userRouter } from './router/userRouter';
import { recipeRouter } from './router/recipeRouter';
import { commentRouter } from './router/commentRouter';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Atualize o caminho para servir os arquivos da pasta uploads
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads'))); // Correto para acessar o diretório uploads
app.listen(Number(process.env.PORT) || 3003, () => {
    console.log(`Servidor rodando na porta ${Number(process.env.PORT) || 3003}`);
});

// Rotas
app.use("/users", userRouter);
app.use("/recipes", recipeRouter);
app.use("/comments", commentRouter);
