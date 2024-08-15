import { BaseError } from "./BaseError";

export class ForbiddenError extends BaseError{
    constructor(
        message: string
    ){
        super(403, message)
    }
}