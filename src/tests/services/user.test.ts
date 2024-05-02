import Prisma, { User } from "../../services/prisma"
import { getUserByEmail } from "../../services/user"


jest.mock("../../services/prisma", () => ({
    user: {
        findUnique: jest.fn(),
        create: jest.fn(),
    },
}));


describe('User Service', () => {

    const mockUser = {
        id: 1,
        name: 'test',
        email: 'test@gmail.com',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date(),
    } as User;


    describe('Get user by Email', () => {


        it('should return user with given email', async () => {

            (Prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    
            const user = await getUserByEmail('test@gmail.com');
    
            expect(user).toBe(mockUser);
        });


        it('should return null if user not found', async () => {

            (Prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    
            const user = await getUserByEmail('test@gmail.com');
    
            expect(user).toBeNull();
        });


        it('should throw error if it failed', async () => {

            const errorMessage = 'Database error';

            (Prisma.user.findUnique as jest.Mock).mockRejectedValue(new Error(errorMessage));
    
            await expect(getUserByEmail('test@gmail.com')).rejects.toThrow(errorMessage);
        });

    });

});