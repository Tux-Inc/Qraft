export interface User {
    id: string;
    username: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

export type UserWithoutPassword = Omit<User, "password">;
export type UserLogin = Pick<User, "username" | "password">;
