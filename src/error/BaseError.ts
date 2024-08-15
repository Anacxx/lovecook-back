export abstract class BaseError extends Error{
    constructor(
        public statusCode: number,
        message: string
    ){
        super(message)
    }
}

// as classes filhas vão receber o statusCode e mensage, isso irá passar pela classe baseError
// e irá retornar a message