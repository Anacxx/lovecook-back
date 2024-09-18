import { z } from 'zod';
import { RecipeDB } from '../../models/recipes';


export interface getAllRecipesInputDTO {
    token: string
}
export type getAllRecipesOutputDTO = RecipeDB[]
export const getAllRecipesDTO = z.object({
    token: z.string(),
}).transform(data => data as getAllRecipesInputDTO);