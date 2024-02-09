import { DataAccess } from '../DAL/DataAccess';
import User from '../Models/User';


export class UserBL {
    private userDataAccess: DataAccess<User>;

    constructor(userDataAccess: DataAccess<User>) {
        this.userDataAccess = userDataAccess;
    }

    async addUser(user: User): Promise<void> {
        try {
            await this.userDataAccess.add(user);
        } catch (error) {
            throw new Error(`Unable to add User: ${(error as Error).message}`);
        }
    }

    async getUser(userId: number): Promise<User> {
        const Post = await this.userDataAccess.get(userId);
        if (!Post) {
            throw new Error(`User with ID ${userId} not found`);
        }
        return Post;
    }

    async updateUser(userId: number, updateData: Partial<User>): Promise<void> {
        try {
            await this.userDataAccess.update(userId, updateData);
        } catch (error) {
            throw new Error(`Unable to update User: ${(error as Error).message}`);
        }
    }

    async deleteUser(userId: number): Promise<void> {
        try {
            await this.userDataAccess.delete(userId);
        } catch (error) {
            throw new Error(`Unable to delete User: ${(error as Error).message}`);
        }
    }
}