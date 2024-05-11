import Prisma, { User } from "./prisma";



export const getUserByEmail = async (email : string): Promise<User | null> => {
    try {
        const user = await Prisma.user.findUnique({
            where: { email },
        });
        return user;

    } catch (error) {
        console.log("Error fiding user by email");
        throw error;
    }
}

export const getUserById = async (id : number): Promise<User | null> => {
    try {
        const user = await Prisma.user.findUnique({
            where: { id },
        });
        return user;

    } catch (error) {
        console.log("Error fiding user by email");
        throw error;
    }
}


export interface createUserInput {
    name: string,
    email: string,
    password: string,
}

export const createUser = async (data: createUserInput): Promise<User> => {
    try {
        const user = await Prisma.user.create({ data });
        return user;

    } catch (error) {
        console.log("Error creating user");
        throw error;
    }
}