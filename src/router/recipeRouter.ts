import express from 'express';
import { RecipeController } from '../controller/RecipeController';
import { RecipeBusiness } from '../business/RecipeBusiness';
import upload from '../middleware/multer';
import { RecipeDatabase } from '../database/RecipeDatabase';
import { IdGenerator } from '../services/IdGenerator';
import { TokenManager } from '../services/TokenManager';

export const recipeRouter = express.Router();

const recipeController = new RecipeController(
    new RecipeBusiness(
        new RecipeDatabase(),
        new IdGenerator(),
        new TokenManager()
    )
);

// CreateRecipe
recipeRouter.post('/new-recipe', upload.single('image'), recipeController.addRecipe);
// GetAllRecipes
recipeRouter.get('/all-recipes',recipeController.getAllRecipes)
// getFavoriteRecipes
recipeRouter.get('/favorites',recipeController.favoritesByUserId)
// GetRecipeById
recipeRouter.get('/:id',recipeController.getRecipeById)
// addFavorites
recipeRouter.post('/favorites/:id',recipeController.addFavorites)
// deleteFavorites
recipeRouter.delete('/delete-favorites/:id',recipeController.deleteFavorites)

