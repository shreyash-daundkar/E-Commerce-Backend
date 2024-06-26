import Prisma from "../../services/prisma"
import { getUserByEmail, createUserInput, createUser, getUserById } from "../../services/user"
import { mockUser, createUserInputMock } from "../mock.data";



jest.mock("../../services/prisma", () => ({
    user: {
        findUnique: jest.fn(),
        create: jest.fn(),
    },
}));



describe('User Service', () => {



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


        it('should return null if it failed', async () => {

            const errorMessage = 'Database error';

            (Prisma.user.findUnique as jest.Mock).mockRejectedValue(new Error(errorMessage));
            
            const user = await getUserByEmail('test@gmail.com');

            expect(user).toBeNull();
        });
    });



    describe('Get user by Id', () => {


        it('should return user with given id', async () => {

            (Prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    
            const user = await getUserById(1);
            expect(user).toBe(mockUser);
        });


        it('should return null if user not found', async () => {

            (Prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    
            const user = await getUserById(1);
            expect(user).toBeNull();
        });


        it('should retun null if it failed', async () => {

            const errorMessage = 'Database error';

            (Prisma.user.findUnique as jest.Mock).mockRejectedValue(new Error(errorMessage));
            
            const user = await getUserById(1);

            expect(user).toBeNull();
        });
    });



    describe('Create User', () => {

        it('should create and return user', async () => {

            (Prisma.user.create as jest.Mock).mockResolvedValue(mockUser);
    
            const user = await createUser(createUserInputMock);
            expect(user).toBe(mockUser);
        });


        it('should return null if it failed', async () => {

            const errorMessage = 'Database error';

            (Prisma.user.create as jest.Mock).mockRejectedValue(new Error(errorMessage));
    
            const user = await createUser(createUserInputMock);

            expect(user).toBeNull();
        });

    });

});
