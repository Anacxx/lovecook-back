import { z } from 'zod';


export const addFavoritesDTO = z.object({
    token: z.string(),
    recipeId: z.string(),
});

export type addFavoritesInputDTO = z.infer<typeof addFavoritesDTO>;
