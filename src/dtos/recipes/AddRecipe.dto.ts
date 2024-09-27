import { z } from "zod";
import { RecipeCategory } from "../../models/recipes";

// Atualizando o schema para refletir que a imagem é um arquivo
export const AddRecipeSchema = z.object({
    title: z.string(),
    image: z.object({ // Definindo um objeto para a imagem com as propriedades esperadas
        buffer: z.instanceof(Buffer), // Buffer da imagem
        originalname: z.string(), // Nome original do arquivo
    }).optional(),
    category: z.enum([ 
        RecipeCategory.Salgados, 
        RecipeCategory.Carnes, 
        RecipeCategory.Peixes, 
        RecipeCategory.Massas, 
        RecipeCategory.Sobremesas, 
        RecipeCategory.Vegetariano, 
        RecipeCategory.Saladas 
    ]),
    ingredients: z.array(z.string()).min(1), // Validação para garantir pelo menos um ingrediente
    method: z.string(),
    additional_instructions: z.string().optional(),
    token: z.string(),
});

// Inferindo os tipos com o schema atualizado
export type AddRecipeInputDTO = z.infer<typeof AddRecipeSchema>;
export type AddRecipeOutputDTO = void;
