export interface CommentDB {
    id: string;
    author: string;
    recipe_id: string;
    user_id: string;
    rating: number;
    comment: string;
    created_at: string;
}

export class Comment {
    constructor(
        private id: string,
        private author: string,
        private recipe_id: string,
        private user_id: string,
        private rating: number,
        private comment: string,
        private created_at: string
    ) {}


    public getId(): string {
        return this.id;
    }
    public getAuthor(): string {
        return this.author;
    }
    public getRecipeId(): string {
        return this.recipe_id;
    }

    public getUserId(): string {
        return this.user_id;
    }

    public getRating(): number{
        return this.rating;
    }

    public getComment(): string {
        return this.comment;
    }

    public getCreatedAt(): string {
        return this.created_at;
    }


    public setId(id: string): void {
        this.id = id;
    }

    public setAuthor(author: string): void {
        this.author = author;
    }
    
    public setRecipeId(recipe_id: string): void {
        this.recipe_id = recipe_id;
    }

    public setUserId(user_id: string): void {
        this.user_id = user_id;
    }

    public setRating(rating: number): void {
        this.rating = rating;
    }

    public setComment(comment: string): void {
        this.comment = comment;
    }

    public setCreatedAt(created_at: string): void {
        this.created_at = created_at;
    }

    public toDBModel(): CommentDB {
        return {
            id: this.id,
            author: this.author,
            recipe_id: this.recipe_id,
            user_id: this.user_id,
            rating: this.rating,
            comment: this.comment,
            created_at: this.created_at
        };
    }

    public static fromDBModel(dbModel: CommentDB): Comment {
        return new Comment(
            dbModel.id,
            dbModel.author,
            dbModel.recipe_id,
            dbModel.user_id,
            dbModel.rating,
            dbModel.comment,
            dbModel.created_at
        );
    }
}
