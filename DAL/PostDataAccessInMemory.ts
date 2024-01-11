import Post from '../Models/Post';
import InMemoryDB from '../Utils/InMemoryDB';
import { DataAccess } from './DataAccess';

export class PostDataAccessInMemory implements DataAccess<Post>{
    private db = InMemoryDB.getInstance();

    async addPost(post: Post): Promise<void> {
        await this.db.addPost(post);
    }

    async getALLPosts(options?: {text?: string; from?: number; to?: number;}):Promise<Partial<Post>[]>{
        const posts = await this.db.getALLPosts(options);
        if (!posts) {
            throw new Error(`Posts not found`);
        }
        return posts;
    }

    async getPost(postId: number): Promise<Post> {
        const post = await this.db.getPost(postId);
        if (!post) {
            throw new Error(`Post with ID ${postId} not found`);
        }
        return post;
    }

    async updatePost(postId: number, updateData: Partial<Post>): Promise<void> {
        const existingPost = await this.db.getPost(postId);
        if (!existingPost) {
            throw new Error(`Post with ID ${postId} not found`);
        }
        await this.db.updatePost(postId, updateData);
    }

    async deletePost(postId: number): Promise<void> {
        const existingPost = await this.db.getPost(postId);
        if (!existingPost) {
            throw new Error(`Post with ID ${postId} not found`);
        }
        await this.db.deletePost(postId);
    }
}