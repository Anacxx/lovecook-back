import { CommentDB } from "../models/comments";
import { BaseDatabase } from "./BaseDatabase";

export class CommentDatabase extends BaseDatabase {
    // public static TABLE_COMMENTS = 'recipes';

    public async addComment(input: CommentDB): Promise<void> {
        await BaseDatabase.connection('comments')
            .insert(input);
    }

    public async getCommentsByRecipeId(recipeId: string): Promise<CommentDB[]> {
        return BaseDatabase.connection('comments')
            .where({ recipe_id: recipeId });
    }
}
