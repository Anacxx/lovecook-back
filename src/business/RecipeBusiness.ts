import { RecipeDatabase } from "../database/RecipeDatabase";
import { Recipe, RecipeDB } from "../models/recipes";
import { TokenManager } from "./../services/TokenManager";
import { IdGenerator } from './../services/IdGenerator';
import { UnauthorizedError } from "../error/UnauthorizedError";
import { AddRecipeInputDTO, AddRecipeOutputDTO } from "../dtos/recipes/AddRecipe.dto";
import { getAllRecipesInputDTO } from "../dtos/recipes/getAllRecipes.dto";

export class RecipeBusiness {
    constructor(
        private recipeDatabase: RecipeDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) {}

    public async addRecipe(input: AddRecipeInputDTO): Promise<AddRecipeOutputDTO> {
        const id = this.idGenerator.generate();
        const { title, image, ingredients, method, additional_instructions, token } = input;

        const payload = this.tokenManager.getPayload(token);
        if (!payload) {
            throw new UnauthorizedError("Não é possível criar receita sem cadastro!");
        }
        
        const newRecipe = new Recipe(
            id,
            payload.id,
            title,
            payload.name,
            image,
            ingredients,
            method,
            additional_instructions,
            0,
            new Date().toISOString()
        );
        
        const recipeDB = newRecipe.toDBModel();
        await this.recipeDatabase.createRecipe(recipeDB);
    }

    public async getAllRecipes(input: getAllRecipesInputDTO): Promise <any> {
        const { token } = input
        const payload = this.tokenManager.getPayload(token);
        if (!payload) {
            throw new UnauthorizedError("Não autorizado!");

        }
        const allRecipesDB = await this.recipeDatabase.getAllRecipes()

        const output = allRecipesDB.map(dbModel => Recipe.fromDBModel(dbModel));

        return output;
    }
}