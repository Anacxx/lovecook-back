// getCommentsByRecipeIdDTO.ts
import { z } from "zod";
import { CommentDB } from "../../models/comments";

export const getCommentsByRecipeIdSchema = z.object({
    recipeId: z.string()
});

export type getCommentsByRecipeIdInputDTO = z.infer<typeof getCommentsByRecipeIdSchema>;

export type getCommentsByRecipeIdOutputDTO = CommentDB
