import { PrismaClient } from "@prisma/client";
import type { User } from "~/types/user";

const prisma = new PrismaClient();

export async function getUsers(): Promise<User[]> {
    return prisma.user.findMany();
}

export async function getUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
}

export async function getUserByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { username } });
}

export async function createUser(user: User): Promise<User> {
    return prisma.user.create({ data: user });
}

export async function updateUser(id: string, user: User): Promise<User> {
    return prisma.user.update({ where: { id }, data: user });
}

export async function deleteUser(id: string): Promise<User> {
    return prisma.user.delete({ where: { id } });
}

export async function isAdmin(user: User): Promise<boolean> {
    const userFromDb = await getUserById(user.id);
    return userFromDb?.role === "ADMIN";
}
