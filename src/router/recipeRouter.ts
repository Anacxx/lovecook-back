import express from 'express';
import { RecipeController } from '../controller/RecipeController';
import { RecipeBusiness } from '../business/RecipeBusiness';
import { RecipeDatabase } from '../database/RecipeDatabase';
import { IdGenerator } from '../services/IdGenerator';
import { TokenManager } from '../services/TokenManager';
import uploadConfig from '../config/upload';
import multer from 'multer';
import { BadRequestError } from '../error/BadRequestError';
import { UserDatabase } from '../database/UserDatabase';

export const recipeRouter = express.Router();
const upload = multer({
  storage: uploadConfig.storage,
});

// Criação do controlador de receita
const recipeController = new RecipeController(
  new RecipeBusiness(
    new RecipeDatabase(),
    new IdGenerator(),
    new TokenManager(),
    new UserDatabase()
  )
);

// Criar Receita
recipeRouter.post('/new-recipe', upload.single('image'), async (req, res) => {
  try {
    // Verifique se o arquivo da imagem foi enviado
    if (!req.file) {
      throw new BadRequestError("A imagem é obrigatória."); // Use a classe BadRequestError
    }

    req.body.image = req.file.filename; // Adicione o nome da imagem ao corpo da requisição
    await recipeController.addRecipe(req, res); // Chame o controlador para adicionar a receita
  } catch (error) {
    if (error instanceof BadRequestError) {
      res.status(error.statusCode).send({ message: error.message });
    } else {
      res.status(500).send({ message: "Erro desconhecido ao criar receita." });
    }
  }
});

// Outras rotas...
recipeRouter.get('/all-recipes', recipeController.getAllRecipes);
recipeRouter.get('/favorites', recipeController.favoritesByUserId);
recipeRouter.get('/:id', recipeController.getRecipeById);
recipeRouter.post('/favorites/:id', recipeController.addFavorites);
recipeRouter.delete('/delete-favorites/:id', recipeController.deleteFavorites);
