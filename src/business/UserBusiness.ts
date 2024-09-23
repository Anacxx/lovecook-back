import { IdGenerator } from './../services/IdGenerator';
import { TokenManager } from './../services/TokenManager';
import { HashManager } from './../services/HashManager';
import { UserDatabase } from '../database/UserDatabase';
import { SignupInputDTO, SignupOutputDTO } from '../dtos/users/signup.dto';
import { TokenPayload, User, USER_ROLES } from '../models/Users';
import { LoginInputDTO, LoginOutputDTO } from '../dtos/users/login.dto';
import { ConflictError } from '../error/ConflictError';
import { NotFoundError } from '../error/NotFoundError';
import { UnauthorizedError } from '../error/UnauthorizedError';

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ) {}

    public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => { 
        const { name, email, password } = input;
        const verifyEmail = await this.userDatabase.getUserByEmail(email);
        if (verifyEmail) {
            throw new ConflictError("Você não pode cadastrar este e-mail, este e-mail já está cadastrado!");
        }
        const id = this.idGenerator.generate();
        const hashedPassword = await this.hashManager.hash(password);
        const newUser = new User(
            id,
            name,
            email,
            hashedPassword,
            new Date().toISOString(),
            USER_ROLES.NORMAL
        );
        const userDB = newUser.toDBModel();
        await this.userDatabase.insertUser(userDB);
        const payload: TokenPayload = {
            id: newUser.getId(),
            name: newUser.getName(),
            role: newUser.getRole()
        };
        const token = this.tokenManager.createToken(payload);
        const output: SignupOutputDTO = {
            message: "Usuário criado com sucesso",
            token: token
        };
        return output;
    };

    public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
        const { email, password } = input;
        const userDB = await this.userDatabase.getUserByEmail(email);
        if (!userDB) {
            throw new NotFoundError("Usuário não cadastrado");
        }
        const isPasswordCorrect = await this.hashManager.compare(password, userDB.password);
        if (!isPasswordCorrect) {
            throw new Error("Email ou senha inválidos");
        }
        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            new Date().toISOString(),
            USER_ROLES.NORMAL
        );
        const payload: TokenPayload = {
            id: user.getId(),
            name: user.getName(),
            role: user.getRole()
        };
        const token = await this.tokenManager.createToken(payload);
        const output: LoginOutputDTO = {
            message: "Login efetuado!",
            token: token
        };
        return output;
    };
}
