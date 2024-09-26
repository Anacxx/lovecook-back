import { RecipeDatabase } from "../database/RecipeDatabase";
import { Favorite, Recipe, RecipeDB } from "../models/recipes";
import { TokenManager } from "./../services/TokenManager";
import { IdGenerator } from './../services/IdGenerator';
import { UnauthorizedError } from "../error/UnauthorizedError";
import { AddRecipeInputDTO } from "../dtos/recipes/AddRecipe.dto";
import { getRecipeByIdInputDTO, getRecipeByIdOutputDTO } from "../dtos/recipes/getRecipeById.dto";
import { favoritesByUserIdInputDTO, favoritesByUserIdOutputDTO } from "../dtos/recipes/favoritesByUserId.dto";
import { addFavoritesInputDTO } from "../dtos/recipes/addFavorites.dto";
import { deleteFavoritesInputDTO } from "../dtos/recipes/deleteFavorites.dto";
import S3Storage from '../utils/S3Storage';
import { UserDatabase } from './../database/UserDatabase';
export class RecipeBusiness {
    constructor(
        private recipeDatabase: RecipeDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private userDatabase: UserDatabase,
    ) {}
    public async addRecipe(input: AddRecipeInputDTO): Promise<void> {
        const id = this.idGenerator.generate();
        const { title, image, ingredients, method, additional_instructions, category, token } = input;
    
        const payload = this.tokenManager.getPayload(token);
        if (!payload) {
            throw new UnauthorizedError("Não é possível criar receita sem cadastro!");
        }
        const userExists = await this.userDatabase.getUserById(payload.id);
        if (!userExists) {
            throw new UnauthorizedError("Usuário não encontrado. Não é possível criar receita!");
        }
    
        if (!image) {
            throw new Error("A imagem é obrigatória.");
        }
    
        const s3Storage = new S3Storage();
        const imageUrl = await s3Storage.saveFile(image); // Obter a URL da imagem no S3
    
        const newRecipe = new Recipe(
            id,
            payload.id,
            title,
            payload.name,
            imageUrl, // Armazenar a URL da imagem no banco de dados
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
    
    
    public async getAllRecipes(): Promise<RecipeDB[]> {
        const allRecipesDB = await this.recipeDatabase.getAllRecipes();
        return allRecipesDB;
    }

    public async getRecipeById(input: getRecipeByIdInputDTO): Promise<getRecipeByIdOutputDTO> {
        const { id } = input;
        const output = await this.recipeDatabase.getRecipeById(id);
        return output;
    }

    public async favoritesByUserId(input: favoritesByUserIdInputDTO): Promise<favoritesByUserIdOutputDTO> {
        const { token } = input;
        if (!token) {
            throw new UnauthorizedError('Token não fornecido!');
        }
        const payload = this.tokenManager.getPayload(token);
        if (!payload) {
            throw new UnauthorizedError("Não autorizado!");
        }
        const userExists = await this.userDatabase.getUserById(payload.id);
        if (!userExists) {
            throw new UnauthorizedError("Usuário não encontrado. Não é possível favoritar receita!");
        }
        const favoriteRecipes = await this.recipeDatabase.favoritesByUserId(payload.id);
        return favoriteRecipes;
    }

    public async addFavorites(input: addFavoritesInputDTO): Promise<void> {
        const { token, recipeId } = input;
        const payload = this.tokenManager.getPayload(token);
        if (!payload) {
            throw new UnauthorizedError("Não é possível adicionar aos favoritos sem cadastro!");
        }
        const userExists = await this.userDatabase.getUserById(payload.id);
        if (!userExists) {
            throw new UnauthorizedError("Usuário não encontrado. Não é possível encontrar favoritos!");
        }
        const newFavorite = new Favorite(
            payload.id,
            recipeId
        );
        const favoriteDB = newFavorite.toDBModel();
        await this.recipeDatabase.addFavorites(favoriteDB);
    }

    public async deleteFavorites(input: deleteFavoritesInputDTO): Promise<void> {
        const { token, recipeId } = input;
        const payload = this.tokenManager.getPayload(token);
        if (!payload) {
            throw new UnauthorizedError("Você precisa estar logado para remover dos favoritos!");
        }
        const userExists = await this.userDatabase.getUserById(payload.id);
        if (!userExists) {
            throw new UnauthorizedError("Usuário não encontrado. Não é possível deletar receita!");
        }
        const favoriteToDelete = new Favorite(
            payload.id,
            recipeId
        );

        const favoriteDB = favoriteToDelete.toDBModel();
        await this.recipeDatabase.deleteFavorites(favoriteDB);
    }
}
