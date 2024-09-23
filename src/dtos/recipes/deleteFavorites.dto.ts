import { z } from 'zod';


export const deleteFavoritesDTO = z.object({
    token: z.string(),
    recipeId: z.string(),
});

export type deleteFavoritesInputDTO = z.infer<typeof deleteFavoritesDTO>;
