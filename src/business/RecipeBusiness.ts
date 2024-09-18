import { RecipeDatabase } from "../database/RecipeDatabase";
import { Favorite, FavoriteDB, Recipe, RecipeDB } from "../models/recipes";
import { TokenManager } from "./../services/TokenManager";
import { IdGenerator } from './../services/IdGenerator';
import { UnauthorizedError } from "../error/UnauthorizedError";
import { AddRecipeInputDTO, AddRecipeOutputDTO } from "../dtos/recipes/AddRecipe.dto";
import { getRecipeByIdInputDTO, getRecipeByIdOutputDTO } from "../dtos/recipes/getRecipeById.dto";

export class RecipeBusiness {
    constructor(
        private recipeDatabase: RecipeDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) {}

    public async addRecipe(input: AddRecipeInputDTO): Promise<AddRecipeOutputDTO> {
        const id = this.idGenerator.generate();
        const { title, image, ingredients, method, additional_instructions, category, token } = input;

        const payload = this.tokenManager.getPayload(token);
        if (!payload) {
            throw new UnauthorizedError("Não é possível criar receita sem cadastro!");
        }
        
        const newRecipe = new Recipe(
            id,
            payload.id,
            title,
            payload.name,
            `/uploads/${image}`,
            category,
            ingredients,
            method,
            additional_instructions,
            0,
            0,
            new Date().toISOString()
        );
        
        const recipeDB = newRecipe.toDBModel();
        await this.recipeDatabase.createRecipe(recipeDB);
    }

    public async getAllRecipes(): Promise <any> {
        const allRecipesDB = await this.recipeDatabase.getAllRecipes()
        const output = allRecipesDB.map(dbModel => Recipe.fromDBModel(dbModel));
        return output;
    }
    public async getRecipeById(input: getRecipeByIdInputDTO): Promise <getRecipeByIdOutputDTO>{
        const { id} = input
        const output = await this.recipeDatabase.getRecipeById(id) 
        return output
    }
    public async getFavoritesByUserId(token: string): Promise <RecipeDB[]>{
        if (!token) {
            throw new UnauthorizedError("Token não fornecido!");
        }
        const payload = this.tokenManager.getPayload(token);
        if (!payload) {
            throw new UnauthorizedError("Não autorizado!");
        }
        const favoriteRecipes = await this.recipeDatabase.getFavoriteRecipes(payload.id)
        return favoriteRecipes
    } 
    public async addFavorites(input: any): Promise <any>{
        const { token, recipeId } = input
        const payload = this.tokenManager.getPayload(token);
        if (!payload) {
            throw new UnauthorizedError("Não é adicionar aos favoritos sem cadastro!");
        }
        const newFavorite = new Favorite(
            payload.id,
            recipeId,
        )
        const favoriteDB = newFavorite.toDBModel()
        await this.recipeDatabase.addFavorites(favoriteDB) 
        
    }
    public async deleteFavorites(input: any): Promise <any>{
        const { token, recipeId } = input;
        const payload = this.tokenManager.getPayload(token);
        if (!payload) {
            throw new UnauthorizedError("Você precisa estar logado para remover dos favoritos!");
        }
        const favoriteToDelete = new Favorite(
            payload.id,
            recipeId
        );
    
        const favoriteDB = favoriteToDelete.toDBModel();
        await this.recipeDatabase.deleteFavorites(favoriteDB);
        
    }
  
}