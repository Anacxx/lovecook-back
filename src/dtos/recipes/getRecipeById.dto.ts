import { z } from 'zod';
import { RecipeDB } from '../../models/recipes';


export interface getRecipeByIdInputDTO {
    id: string
}
export type getRecipeByIdOutputDTO = RecipeDB
// mudar isso aqui pois a DB E A MODEL NAÃO DEVERIAM SER IGUAIS
export const getRecipeByIdDTO = z.object({
    id: z.string()
}).transform(data => data as getRecipeByIdInputDTO);
