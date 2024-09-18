import { Request, Response } from "express"
import { AddCommentSchema } from "../dtos/comments/AddComment.dto"
import { CommentBusiness } from './../business/CommentBusiness';
import { ZodError } from "zod";
import { BaseError } from "../error/BaseError";
import { getCommentsByRecipeIdSchema } from "../dtos/comments/GetCommetsByRecipeId.dto";
import { RecipeBusiness } from './../business/RecipeBusiness';

export class CommentController{
    constructor(
        private commentBusiness: CommentBusiness
    ){
    }
    public addComment = async (req: Request, res: Response) => {
        try {
            const input = AddCommentSchema.parse({
                recipe_id: req.params.id,
                token: req.headers.authorization,
                comment: req.body.comment,
                rating: req.body.rating
            })
            const output = await this.commentBusiness.addComment(input)
            res.status(201).send(output)
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send({ issues: error.issues });
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send({ message: error.message });
            } else {
                console.error("Unexpected error:", error);
                res.status(500).send(error);
            }
        }
    }
    public getCommentsByRecipeId = async (req: Request, res: Response) => {
        try {
            const input = getCommentsByRecipeIdSchema.parse({
                recipeId: req.params.id
            })
            const output = await this.commentBusiness.getCommentsByRecipeId(input)
            res.status(200).send(output)
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send({ issues: error.issues });
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send({ message: error.message });
            } else {
                console.error("Unexpected error:", error);
                res.status(500).send(error);
            }
        }
    }
    
    
}