import { Request, Response } from 'express';
import Post from '../Models/Post';
import { PostBL } from '../BL/PostBL';

export class PostController {

    private postBL: PostBL;

    constructor(postBL: PostBL) {
        this.postBL = postBL;
    }

    async addPost(req: Request, res: Response): Promise<void> {
        const postData = req.body;
        const post = new Post(postData.id, postData.title, postData.description, postData.body, postData.posted_by);
        try {
            await this.postBL.addPost(post);
            res.status(201).send({ message: `Post created successfully` });
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }

    async getALLPosts(req: Request, res: Response): Promise<void> {
        try {

            const text = req.query.text as string;
            const from = parseInt(req.query.from as string); 
            const to = parseInt(req.query.to as string);

        
            const posts = await this.postBL.getALLPosts(text, from, to);
        
            res.status(200).send(posts);
        
        } catch (error) {
            res.status(400).send((error as Error).message); 
        }
    }

    async getPost(req: Request, res: Response): Promise<void> {
        const postId = +req.params.id;
        try {
            const post = await this.postBL.getPost(postId);
            res.status(200).send(post);
        } catch(error) {
            res.status(400).send((error as Error).message);
        }
    }

    async updatePost(req: Request, res: Response): Promise<void> {
        const postId = +req.params.id;
        const postData = req.body;
        try {
            await this.postBL.updatePost(postId, postData);
            res.status(200).send({ message: `Post ${postId} updated successfully` });
        } catch(error) {
            res.status(400).send((error as Error).message);
        }
    }

    async deletePost(req: Request, res: Response): Promise<void> {
        const postId = +req.params.id;
        try {
            await this.postBL.deletePost(postId);
            res.status(200).send({ message: `Post ${postId} deleted successfully` });
        } catch(error) {
            res.status(400).send((error as Error).message);
        }
    }

    // async countAllPosts(req: Request, res: Response): Promise<void> {
    //     try {      
    //         const postsCount = await this.postBL.countAllPosts();
    //         console.log(postsCount)
    //         res.status(200).send({postsCount});
        
    //     } catch (error) {
    //         res.status(400).send((error as Error).message); 
    //     }
    // }
}