import { number, z } from "zod";

export const AddCommentSchema = z.object({
    recipe_id: z.string(),
    rating: z.number(),
    comment: z.string(),
    token: z.string(),
});

export type AddCommentInputDTO = z.infer<typeof AddCommentSchema>;
export interface AddCommentOutputDTO {
    message: string

}