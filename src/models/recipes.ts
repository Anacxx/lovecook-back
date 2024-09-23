export enum RecipeCategory {
    Salgados = 'Comidas salgadas',
    Carnes = 'Carnes',
    Peixes = 'Peixes e frutos do mar',
    Massas = 'Massas',
    Sobremesas = 'Sobremesas',
    Vegetariano = 'Vegetariano',
    Saladas = 'Saladas'
}

export interface RecipeDB {
    id: string;
    creator_id: string;
    title: string;
    creator: string;
    image: string | undefined;
    category: RecipeCategory;
    ingredients: string;
    method: string;
    additional_instructions: string | undefined;
    total_rating: number;
    average_rating: number;
    created_at: string;
}

  
export class Recipe {
    constructor(
        private id: string,
        private creator_id: string,
        private title: string,
        private creator: string,
        private image: string | undefined,
        private category: RecipeCategory,
        private ingredients: string[], // Armazenado como array de strings
        private method: string,
        private additional_instructions: string | undefined,
        private total_rating: number,
        private average_rating: number,
        private created_at: string
    ) {}

    public toDBModel(): RecipeDB {
        return {
            id: this.id,
            creator_id: this.creator_id,
            title: this.title,
            creator: this.creator,
            image: this.image,
            category: this.category,
            ingredients: JSON.stringify(this.ingredients), 
            method: this.method,
            additional_instructions: this.additional_instructions,
            total_rating: this.total_rating,
            average_rating: this.average_rating,
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
            dbModel.category,
            JSON.parse(dbModel.ingredients), // Converte a string JSON de volta para array
            dbModel.method,
            dbModel.additional_instructions,
            dbModel.total_rating,
            dbModel.average_rating,
            dbModel.created_at
        );
    }
}
export interface FavoriteDB {
    user_id: string;
    recipe_id: string;
}

export class Favorite {
    constructor(
        private user_id: string,
        private recipe_id: string
    ) {}

    public toDBModel(): FavoriteDB {
        return {
            user_id: this.user_id,
            recipe_id: this.recipe_id
        };
    }

    public static fromDBModel(dbModel: FavoriteDB): Favorite {
        return new Favorite(
            dbModel.user_id,
            dbModel.recipe_id
        );
    }
}

