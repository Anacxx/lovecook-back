import { ZodError } from "zod";
import { AddRecipeSchema } from "../dtos/recipes/AddRecipe.dto"
import { BaseError } from "../error/BaseError";
import { RecipeBusiness } from "../business/RecipeBusiness";
import {Request, Response } from 'express';
import { getRecipeByIdDTO } from "../dtos/recipes/getRecipeById.dto";
import { UnauthorizedError } from "../error/UnauthorizedError";

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
                category: req.body.category,
                ingredients: ingredients,
                method: req.body.method,
                additional_instructions: req.body.additional_instructions,
                token: req.headers.authorization
            });
            await this.recipeBusiness.addRecipe(input);
            res.status(201).send({ message: "Receita criada com sucesso!" });
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
            const output = await this.recipeBusiness.getAllRecipes()
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
    public getRecipeById = async (req: Request, res: Response) => {
        try {
            const input = getRecipeByIdDTO.parse({
                id: req.params.id
            })
            const output = await this.recipeBusiness.getRecipeById(input)
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
    public getFavoritesByUserId = async (req: Request, res: Response) => {
        try {
            const token =  req.headers.authorization
            if (!token) {
                throw new UnauthorizedError("Token não fornecido!");
            }
            const output = await this.recipeBusiness.getFavoritesByUserId(token)
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

    public addFavorites = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                recipeId: req.params.id
            }
            const output = await this.recipeBusiness.addFavorites(input)
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
    public deleteFavorites = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                recipeId: req.params.id
            }
            const output = await this.recipeBusiness.deleteFavorites(input)
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
    // public deleteRecipeById = async (req: Request, res: Response) => {
    //     try {
    //         const input = getRecipeByIdDTO.parse({
    //             token: req.headers.authorization,
    //             id: req.params.id
    //         })
    //         const output = await this.recipeBusiness.getRecipeById(input)
    //         res.status(200).send(output)
    //     } catch (error) {
    //         if (error instanceof ZodError) {
    //             res.status(400).send({ issues: error.issues });
    //         } else if (error instanceof BaseError) {
    //             res.status(error.statusCode).send({ message: error.message });
    //         } else {
    //             console.error("Unexpected error:", error);
    //             res.status(500).send(error);
    //         }
    //     }
    // }
    
}