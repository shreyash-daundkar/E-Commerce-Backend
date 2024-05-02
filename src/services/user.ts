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


