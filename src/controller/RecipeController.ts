import { ZodError } from "zod";
import { Request, Response } from 'express';
import { RecipeBusiness } from "../business/RecipeBusiness";
import { AddRecipeSchema } from "../dtos/recipes/AddRecipe.dto";
import { getRecipeByIdDTO } from "../dtos/recipes/getRecipeById.dto";
import { favoritesByUserIdDTO } from "../dtos/recipes/favoritesByUserId.dto";
import { BaseError } from "../error/BaseError";
import { addFavoritesDTO } from "../dtos/recipes/addFavorites.dto";
import { deleteFavoritesDTO } from "../dtos/recipes/deleteFavorites.dto";

export class RecipeController {
    constructor(
        private recipeBusiness: RecipeBusiness
    ) {}

    private handleError(error: any, res: Response) {
        if (error instanceof ZodError) {
            return res.status(400).send({ issues: error.issues });
        } else if (error instanceof BaseError) {
            return res.status(error.statusCode).send({ message: error.message });
        } else {
            console.error("Unexpected error:", error);
            return res.status(500).send({ message: "Internal server error" });
        }
    }

    public addRecipe = async (req: Request, res: Response) => {
        try {
            const image = req.file?.filename;
            const ingredients = JSON.parse(req.body.ingredients);

            const input = AddRecipeSchema.parse({
                title: req.body.title,
                image,
                category: req.body.category,
                ingredients,
                method: req.body.method,
                additional_instructions: req.body.additional_instructions,
                token: req.headers.authorization
            });

            await this.recipeBusiness.addRecipe(input);
            res.status(201).send({ message: "Receita criada com sucesso!" });
        } catch (error) {
            this.handleError(error, res);
        }
    }

    public getAllRecipes = async (req: Request, res: Response) => {
        try {
            const recipes = await this.recipeBusiness.getAllRecipes();
            res.status(200).send(recipes);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    public getRecipeById = async (req: Request, res: Response) => {
        try {
            const input = getRecipeByIdDTO.parse({
                id: req.params.id
            });

            const recipe = await this.recipeBusiness.getRecipeById(input);
            res.status(200).send(recipe);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    public favoritesByUserId = async (req: Request, res: Response) => {
        try {
            const input = favoritesByUserIdDTO.parse({
                token: req.headers.authorization
            });

            const favorites = await this.recipeBusiness.favoritesByUserId(input);
            res.status(200).send(favorites);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    public addFavorites = async (req: Request, res: Response) => {
        try {
            const input = addFavoritesDTO.parse({
                token: req.headers.authorization,
                recipeId: req.params.id
            });

            const result = await this.recipeBusiness.addFavorites(input);
            res.status(200).send(result);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    public deleteFavorites = async (req: Request, res: Response) => {
        try {
            const input = deleteFavoritesDTO.parse({
                token: req.headers.authorization,
                recipeId: req.params.id
            });

            const result = await this.recipeBusiness.deleteFavorites(input);
            res.status(200).send(result);
        } catch (error) {
            this.handleError(error, res);
        }
    }
}
