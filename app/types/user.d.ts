export interface User {
    id: string;
    username: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ChangePassword {
    oldPassword: string;
    newPassword: string;
}

export type UserWithoutPassword = Omit<User, "password">;
export type UserLogin = Pick<User, "username" | "password">;
export type UserWithoutDates = Omit<User, "id" | "createdAt" | "updatedAt">;
