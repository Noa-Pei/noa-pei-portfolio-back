import express, { Request, Response } from 'express';
import { UserController } from '../Controllers/UserController';
import { UserBL } from '../BL/UserBL';
import { UserDataAccessSQL } from '../DAL/UserDataAccessSQL';

const router = express.Router();
const userController = new UserController(new UserBL(new UserDataAccessSQL()));

router.post('/', async (req: Request, res: Response) => await userController.addUser(req,res));
router.get('/', async (req: Request, res: Response) => await userController.getALLUsers(req,res));
router.get('/:u_id', async (req: Request, res: Response) => await userController.getUser(req,res));
router.put('/:u_id', async (req: Request, res: Response) => await userController.updateUser(req,res));
router.delete('/:u_id', async (req: Request, res: Response) => await userController.deleteUser(req,res));

export default router; 