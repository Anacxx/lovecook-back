
import { FavoriteDB, RecipeDB } from "../models/recipes";
import { BaseDatabase } from "./BaseDatabase";

export class RecipeDatabase extends BaseDatabase {
    public static TABLE_RECIPES = 'recipes';
    public static TABLE_FAVORITES = 'favorites'
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
    public async getRecipeById(id: string): Promise <any>{
        const recipeById = await BaseDatabase.connection('recipes').where({id}).first();
        return recipeById
    }
    public async getFavoriteRecipes(userId: string): Promise<RecipeDB[]> {
        try {
            const result = await BaseDatabase.connection(RecipeDatabase.TABLE_FAVORITES + " as f")
                .select(
                    "r.id",
                    "r.title",
                    "r.image",
                    "r.category",
                    "r.ingredients",
                    "r.method",
                    "r.additional_instructions",
                    "r.total_rating",
                    "r.average_rating",
                    "r.created_at"
                )
                .innerJoin(`${RecipeDatabase.TABLE_RECIPES} as r`, "f.recipe_id", "r.id")
                .where("f.user_id", userId);
    
            return result;
        } catch (error) {
            console.error("Database error:", error); 
            throw new Error("Erro ao buscar as receitas favoritas do usuário");
        }
    }
    
    
    public async deleteRecipeById(id: string): Promise <void>{
        await BaseDatabase.connection('recipes').where({id}).delete()
    }
    public async updateRecipeRating(recipeId: string, averageRating: number): Promise<void> {
        await BaseDatabase.connection('recipes')
            .where({ id: recipeId })
            .update({ average_rating: averageRating });
    }
    public async updateTotalRating(recipe_id: string, total_rating: number): Promise<void> {
        await BaseDatabase.connection('recipes')
            .where({ id: recipe_id })
            .update({ total_rating: total_rating });
    }
    public async addFavorites(input: FavoriteDB): Promise<void> {
        await BaseDatabase.connection('favorites')
        .insert(input)
    }
    public async deleteFavorites(input: FavoriteDB): Promise<void> {
        await BaseDatabase.connection('favorites')
        .where(input)
        .del();
    }
}