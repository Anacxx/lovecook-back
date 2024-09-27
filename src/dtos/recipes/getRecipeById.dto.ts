import { z } from 'zod';
import { RecipeDB } from '../../models/recipes';


export interface getRecipeByIdInputDTO {
    id: string
}
export type getRecipeByIdOutputDTO = RecipeDB

export const getRecipeByIdDTO = z.object({
    id: z.string()
}).transform(data => data as getRecipeByIdInputDTO);
