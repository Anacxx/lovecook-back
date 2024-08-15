export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
  }
export interface TokenPayload {
    id: string,
	name: string,
    role: USER_ROLES
}
export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    created_at: string,
    role: USER_ROLES
}

export interface UserModel {
    id: string,
    name: string,
    email: string,
    created_at: string,
    role: USER_ROLES
}
export class User {    
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private created_at: string,
        private role: USER_ROLES
    ) {}

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getName(): string {
        return this.name
    }

    public setName(value: string): void {
        this.name = value
    }

    public getEmail(): string {
        return this.email
    }

    public setEmail(value: string): void {
        this.email = value
    }

    public getPassword(): string {
        return this.password
    }

    public setPassword(value: string): void {
        this.password = value
    }
    public getRole(): USER_ROLES {
        return this.role
    }

    public setRole(value: USER_ROLES): void {
        this.role = value
    }
    public createdAt(): string {
        return this.created_at
    }

    public setCreatedAt(value: USER_ROLES): void {
        this.created_at = value
    }
    public toDBModel():UserDB {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            created_at: this.created_at,
            role: this.role
        }
    }
    public toModel():UserModel {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            created_at: this.created_at,
            role: this.role
        }
    }
}