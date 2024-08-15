import { UserDB } from "../models/Users";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase{

    public static TABLE_USERS = "users"

    public insertUser = async(userDB: UserDB): Promise<void> => {
        await BaseDatabase.connection('users')
        .insert(userDB)
    }
    public getUserByEmail = async(email: string): Promise<UserDB | null> => {
        const [ result ] = await BaseDatabase.connection('users')
        .select("*")
        .where({email})
        return result as UserDB | null
    }
}