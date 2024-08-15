import { z } from "zod";

export const AddRecipeSchema = z.object({
    title: z.string(),
    image: z.string().optional(),
    ingredients: z.array(z.string()).min(1), // validação para garantir pelo menos um ingrediente
    method: z.string(),
    additional_instructions: z.string().optional(),
    token: z.string(),
});

export type AddRecipeInputDTO = z.infer<typeof AddRecipeSchema>;
export type AddRecipeOutputDTO = void;
