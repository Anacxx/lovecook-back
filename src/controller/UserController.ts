import { ZodError } from 'zod';
import { UserBusiness } from './../business/UserBusiness';
import { BaseError } from '../error/BaseError';
import { Request, Response } from 'express';
import { SignupSchema } from '../dtos/users/signup.dto';
import { LoginSchema } from '../dtos/users/login.dto';

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) {}

    private handleError(error: any, res: Response) {
        if (error instanceof ZodError) {
            return res.status(400).send({ issues: error.issues });
        } else if (error instanceof BaseError) {
            return res.status(error.statusCode).send({ message: error.message });
        } else {
            console.error("Unexpected error:", error);
            return res.status(500).send({ message: "Internal server error" });
        }
    }

    public signup = async (req: Request, res: Response) => {
        try {
            const input = SignupSchema.parse({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            const output = await this.userBusiness.signup(input);
            res.status(201).send(output);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    public login = async (req: Request, res: Response) => {
        try {
            const input = LoginSchema.parse({
                email: req.body.email,
                password: req.body.password
            });
            const output = await this.userBusiness.login(input);
            res.status(200).send(output);
        } catch (error) {
            this.handleError(error, res);
        }
    };
}
