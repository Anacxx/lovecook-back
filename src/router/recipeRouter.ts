import express from 'express';
import { RecipeController } from '../controller/RecipeController';
import { RecipeBusiness } from '../business/RecipeBusiness';
import { RecipeDatabase } from '../database/RecipeDatabase';
import { IdGenerator } from '../services/IdGenerator';
import { TokenManager } from '../services/TokenManager';
import multer from 'multer';
import uploadConfig from '../config/upload';
import { BadRequestError } from '../error/BadRequestError';
import { UserDatabase } from '../database/UserDatabase';
import UploadImagesService from '../services/UploadImagesService';

export const recipeRouter = express.Router();
const upload = multer(uploadConfig);

const recipeController = new RecipeController(
  new RecipeBusiness(
    new RecipeDatabase(),
    new IdGenerator(),
    new TokenManager(),
    new UserDatabase()
  )
);

recipeRouter.post('/new-recipe', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      throw new BadRequestError("A imagem é obrigatória.");
    }

    const uploadService = new UploadImagesService();
    const imageUrl = await uploadService.execute(req.file); 

    req.body.image = imageUrl; 
    await recipeController.addRecipe(req, res);
  } catch (error) {
    if (error instanceof BadRequestError) {
      res.status(error.statusCode).send({ message: error.message });
    } else {
      res.status(500).send({ message: "Erro desconhecido ao criar receita." });
    }
  }
});
// getAllRecipes
recipeRouter.get('/all-recipes', recipeController.getAllRecipes);
// favoritesByUserId
recipeRouter.get('/favorites', recipeController.favoritesByUserId);
// getRecipeById
recipeRouter.get('/:id', recipeController.getRecipeById);
// addFavorites
recipeRouter.post('/favorites/:id', recipeController.addFavorites);
// deleteFavorites
recipeRouter.delete('/delete-favorites/:id', recipeController.deleteFavorites);
