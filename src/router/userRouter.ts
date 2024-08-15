import  express  from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../database/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { TokenManager } from "../services/TokenManager";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router()


const userController = new UserController(
    new UserBusiness(
        new UserDatabase(),
        new IdGenerator(),
        new TokenManager(),
        new HashManager()
    )
)
//Signup
userRouter.post('/signup', userController.signup);
//Login
userRouter.post('/login', userController.login);