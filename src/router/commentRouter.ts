import express from 'express';
import { IdGenerator } from '../services/IdGenerator';
import { TokenManager } from '../services/TokenManager';
import { CommentDatabase } from '../database/CommentDatabase';
import { CommentBusiness } from '../business/CommentBusiness';
import { CommentController } from '../controller/CommentController';
import { RecipeDatabase } from '../database/RecipeDatabase';

export const commentRouter = express.Router();

const commentController = new CommentController(
    new CommentBusiness(
        new CommentDatabase(),
        new RecipeDatabase(),
        new TokenManager(),
        new IdGenerator()
    )
);

// CreateComment
commentRouter.post('/:id/new-comment', commentController.addComment);
// GetCommentByRecipeId
commentRouter.get('/:id',commentController.getCommentsByRecipeId)