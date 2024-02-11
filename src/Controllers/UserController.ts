import { Request, Response } from 'express';
import User from '../Models/User';
import { UserBL } from '../BL/UserBL';

export class UserController {

    private userBL: UserBL;

    constructor(userBL: UserBL) {
        this.userBL = userBL;
    }

    async addUser(req: Request, res: Response): Promise<void> {
        const userData = req.body;
        const user = new User(userData.u_id, userData.first_name, userData.surname, userData.email);
        try {
            await this.userBL.addUser(user);
            res.status(201).send({ message: `User created successfully` });
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }

    async getALLUsers(req: Request, res: Response): Promise<void> {
        try {
            const text = req.query.text as string;
            const from = parseInt(req.query.from as string); 
            const to = parseInt(req.query.to as string);

            const posts = await this.userBL.getALLUsers(text, from, to);
        
            res.status(200).send(posts);  
        } catch (error) {
            res.status(400).send((error as Error).message); 
        }
    }

    async getUser(req: Request, res: Response): Promise<void> {
        const userId = +req.params.u_id;
        try {
            const user = await this.userBL.getUser(userId);
            res.status(200).send(user);
        } catch(error) {
            res.status(400).send((error as Error).message);
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        const userId = +req.params.u_id;
        const userData = req.body;
        try {
            await this.userBL.updateUser(userId, userData);
            res.status(200).send({ message: `User ${userId} updated successfully` });
        } catch(error) {
            res.status(400).send((error as Error).message);
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        const userId = +req.params.u_id;
        try {
            await this.userBL.deleteUser(userId);
            res.status(200).send({ message: `User ${userId} deleted successfully` });
        } catch(error) {
            res.status(400).send((error as Error).message);
        }
    }
}