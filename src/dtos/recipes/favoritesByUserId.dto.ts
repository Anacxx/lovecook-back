import { z } from 'zod';
import { RecipeDB } from '../../models/recipes';


export interface favoritesByUserIdInputDTO {
    token: string
}
export type favoritesByUserIdOutputDTO = RecipeDB[]

export const favoritesByUserIdDTO = z.object({
    token: z.string()
}).transform(data => data as favoritesByUserIdInputDTO);
