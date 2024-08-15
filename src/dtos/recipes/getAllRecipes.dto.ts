import { z } from 'zod';


export interface getAllRecipesInputDTO {
    token: string
}
export const getAllRecipesDTO = z.object({
    token: z.string(),
}).transform(data => data as getAllRecipesInputDTO);