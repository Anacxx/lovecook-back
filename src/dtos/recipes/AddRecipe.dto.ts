import { number, z } from "zod";
import { RecipeCategory } from "../../models/recipes";

export const AddRecipeSchema = z.object({
    title: z.string(),
    image: z.string().optional(),
    category: z.enum([ 
        RecipeCategory.Salgados, 
        RecipeCategory.Carnes, 
        RecipeCategory.Peixes, 
        RecipeCategory.Massas, 
        RecipeCategory.Sobremesas, 
        RecipeCategory.Vegetariano, 
        RecipeCategory.Saladas 
    ]),
    ingredients: z.array(z.string()).min(1), // validação para garantir pelo menos um ingrediente
    method: z.string(),
    additional_instructions: z.string().optional(),
    token: z.string(),
});

export type AddRecipeInputDTO = z.infer<typeof AddRecipeSchema>;
export type AddRecipeOutputDTO = void;
