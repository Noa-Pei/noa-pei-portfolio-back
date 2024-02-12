import { DataAccess } from '../DAL/DataAccess';
import User from '../Models/User';
import { UserDataAccessSQL } from '../DAL/UserDataAccessSQL';


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

    async getALLUsers(text?: string, from?: number, to?: number): Promise<Partial<User>[]> {
        const Users = await this.userDataAccess.getALL(text, from, to);
        if (!Users) {
            throw new Error(`Posts not found`);
        }
        return Users;
    }

    async getUserByLoginInfo(email: string): Promise<User> {
        const userDataAccessSQL = this.userDataAccess as UserDataAccessSQL;
        const User = await userDataAccessSQL.getUserByLoginInfo(email);
        if (!User) {
            throw new Error(`User with email ${email} not found`);
        }
        return User;
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