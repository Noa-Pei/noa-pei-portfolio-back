import express, { Request, Response } from 'express';
import { PostController } from '../Controllers/PostController';
import { PostBL } from '../BL/PostBL';
import { PostDataAccessSQL } from '../DAL/PostDataAccessSQL';
// import { PostDataAccessInMemory } from '../DAL/PostDataAccessInMemory';

const router = express.Router();
const postController = new PostController(new PostBL(new PostDataAccessSQL()));
// const postController = new PostController(new PostBL(new PostDataAccessInMemory()));

router.post('/', async (req: Request, res: Response) => await postController.addPost(req,res));
router.get('/', async (req: Request, res: Response) => await postController.getALLPosts(req,res));
router.get('/:id', async (req: Request, res: Response) => await postController.getPost(req,res));
router.put('/:id', async (req: Request, res: Response) => await postController.updatePost(req,res));
router.delete('/:id', async (req: Request, res: Response) => await postController.deletePost(req,res));
router.get('/count', async (req: Request, res: Response) => await postController.countAllPosts(req,res));

export default router; 

