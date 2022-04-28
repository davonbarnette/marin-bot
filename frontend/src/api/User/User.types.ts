export interface IUser {
    activated: number,
    blocked: boolean | null,
    email: string,
    first_name: string,
    id: number,
    last_name: string,
    role: IUserRole,
    user_group: number,
    username: string,
    picture?: string
}

export interface ISignupValues {
    username?: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
}

export interface IUserRole {
    description: string,
    id: number,
    name: string,
    type: string,
}

export interface ILoginValues {
    username: string,
    password: string,
}

export interface ILoginResponse {
    jwt: string,
    user: IUser,
}

export interface ISignupResponse {
    jwt: string,
    user: IUser,
}
