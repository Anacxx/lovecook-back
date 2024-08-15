
export interface RecipeDB {
    id: string;
    creator_id: string;
    title: string;
    creator: string;
    image: string | undefined;
    ingredients: string;
    method: string;
    additional_instructions: string | undefined;
    rating: number;
    created_at: string;
}

export class Recipe {
    constructor(
        private id: string,
        private creator_id: string,
        private title: string,
        private creator: string,
        private image: string | undefined,
        private ingredients: string[], // Armazenado como array de strings
        private method: string,
        private additional_instructions: string | undefined,
        private rating: number,
        private created_at: string
    ) {}



    public toDBModel(): RecipeDB {
        return {
            id: this.id,
            creator_id: this.creator_id,
            title: this.title,
            creator: this.creator,
            image: this.image,
            ingredients: JSON.stringify(this.ingredients), // Converte o array em JSON string
            method: this.method,
            additional_instructions: this.additional_instructions,
            rating: this.rating,
            created_at: this.created_at
        };
    }

    public static fromDBModel(dbModel: RecipeDB): Recipe {
        return new Recipe(
            dbModel.id,
            dbModel.creator_id,
            dbModel.title,
            dbModel.creator,
            dbModel.image,
            JSON.parse(dbModel.ingredients), // Converte a string JSON de volta para um array
            dbModel.method,
            dbModel.additional_instructions,
            dbModel.rating,
            dbModel.created_at
        );
    }
}
