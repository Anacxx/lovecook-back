import { AddCommentOutputDTO, AddCommentInputDTO } from "../dtos/comments/AddComment.dto";
import { CommentDatabase } from "../database/CommentDatabase";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { Comment, CommentDB } from "../models/comments";
import { TokenManager } from "../services/TokenManager";
import { IdGenerator } from './../services/IdGenerator';
import { RecipeDatabase } from './../database/RecipeDatabase';
import { getCommentsByRecipeIdInputDTO, getCommentsByRecipeIdOutputDTO } from "../dtos/comments/GetCommetsByRecipeId.dto";

export class CommentBusiness {
    constructor(
        private commentDatabase: CommentDatabase,
        private recipeDatabase: RecipeDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
    ) {}

    public async addComment(input: AddCommentInputDTO): Promise<AddCommentOutputDTO> {
        const { recipe_id, token, comment, rating } = input;
        const payload = this.tokenManager.getPayload(token);
        if (!payload) {
            throw new UnauthorizedError("Não é possível criar comentário sem cadastro!");
        }
        const id = this.idGenerator.generate();
        const newComment = new Comment(
            id,
            payload.name,
            recipe_id,
            payload.id,
            rating,
            comment,
            new Date().toISOString()
        );
        const commentDB = newComment.toDBModel();
        await this.commentDatabase.addComment(commentDB);
        const comments: CommentDB[] = await this.commentDatabase.getCommentsByRecipeId(commentDB.recipe_id);
        const total_rating = comments.length;
        const total = comments.reduce((sum, comment) => sum + comment.rating, 0);
        const averageRating = comments.length > 0 ? Math.round(total / comments.length) : 0;
        const clampedAverageRating = Math.max(0, Math.min(averageRating, 5));

        await this.recipeDatabase.updateRecipeRating(commentDB.recipe_id, clampedAverageRating);
        await this.recipeDatabase.updateTotalRating(commentDB.recipe_id, total_rating);
        const output: AddCommentOutputDTO = {
            message: 'Comentário criado!'
        };
        return output;
    }

    public async getCommentsByRecipeId(input: getCommentsByRecipeIdInputDTO): Promise<getCommentsByRecipeIdOutputDTO[]> {
        const { recipeId } = input;
        const output = await this.commentDatabase.getCommentsByRecipeId(recipeId);
        return output;
    }
}
