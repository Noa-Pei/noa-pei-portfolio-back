import express, { Request, Response } from 'express';
import { PostController } from '../Controllers/PostController';
import { PostBL } from '../BL/PostBL';
import { PostDataAccessSQL } from '../DAL/PostDataAccessSQL';

const router = express.Router();
const postController = new PostController(new PostBL(new PostDataAccessSQL()));

router.post('/', async (req: Request, res: Response) => await postController.addPost(req,res));
router.get('/', async (req: Request, res: Response) => await postController.getALLPosts(req,res));
router.get('/:id', async (req: Request, res: Response) => await postController.getPost(req,res));
router.put('/:id', async (req: Request, res: Response) => await postController.updatePost(req,res));
router.delete('/:id', async (req: Request, res: Response) => await postController.deletePost(req,res));

export default router; 


