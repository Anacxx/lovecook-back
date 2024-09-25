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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.listen(Number(process.env.PORT) || 3003, () => {
    console.log(`Servidor rodando na porta ${Number(process.env.PORT) || 3003}`);
});


app.use("/users", userRouter);
app.use("/recipes", recipeRouter);
app.use("/comments", commentRouter);
