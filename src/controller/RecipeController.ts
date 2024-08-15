import { ZodError } from "zod";
import { AddRecipeSchema } from "../dtos/recipes/AddRecipe.dto"
import { Request, Response } from "express";
import { BaseError } from "../error/BaseError";
import { RecipeBusiness } from "../business/RecipeBusiness";
import { getAllRecipesDTO } from "../dtos/recipes/getAllRecipes.dto";

export class RecipeController {
    constructor(
        private recipeBusiness: RecipeBusiness
    ) {}

    public addRecipe = async (req: Request, res: Response) => {
        try {
            const image = req.file?.filename;
            const ingredients = JSON.parse(req.body.ingredients);
            const input = AddRecipeSchema.parse({
                title: req.body.title,
                image: image,
                ingredients: ingredients,
                method: req.body.method,
                additional_instructions: req.body.additional_instructions,
                token: req.headers.authorization
            });

            await this.recipeBusiness.addRecipe(input);
            res.status(201).send({ message: "Recipe created successfully" });
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
    
    public getAllRecipes = async (req: Request, res: Response) => {
        try {
            const input = getAllRecipesDTO.parse({
                token: req.headers.authorization })
            const output = await this.recipeBusiness.getAllRecipes(input)
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