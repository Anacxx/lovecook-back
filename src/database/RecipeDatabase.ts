import { AddRecipeInputDTO } from "../dtos/recipes/AddRecipe.dto";
import { BaseDatabase } from "./BaseDatabase";

export class RecipeDatabase extends BaseDatabase {
    public static TABLE_RECIPES = 'recipes';

    public async createRecipe(recipeData: any): Promise<void> {
        try {
            await BaseDatabase.connection(RecipeDatabase.TABLE_RECIPES)
                .insert(recipeData);
        } catch (error) {
            throw new Error(`Database error: ${error}`);
        }
    }
    public async getAllRecipes(): Promise<any[]>{
        const  allRecipesDB = await BaseDatabase.connection('recipes').select();
        return allRecipesDB
    }
}