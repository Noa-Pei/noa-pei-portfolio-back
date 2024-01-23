import { DataAccess } from '../DAL/DataAccess';
import Post from '../Models/Post';

export class PostBL {
    private postDataAccess: DataAccess<Post>;

    constructor(postDataAccess: DataAccess<Post>) {
        this.postDataAccess = postDataAccess;
    }

    async addPost(post: Post): Promise<void> {
        try {
            await this.postDataAccess.addPost(post);
        } catch (error) {
            throw new Error(`Unable to add Post: ${(error as Error).message}`);
        }
    }

    async getALLPosts(text?: string, from?: number, to?: number): Promise<Partial<Post>[]> {
        const Posts = await this.postDataAccess.getALLPosts(text, from, to);
        if (!Posts) {
            throw new Error(`Posts not found`);
        }
        return Posts;
    }

    async getPost(postId: number): Promise<Post> {
        const Post = await this.postDataAccess.getPost(postId);
        if (!Post) {
            throw new Error(`Post with ID ${postId} not found`);
        }
        return Post;
    }

    async updatePost(postId: number, updateData: Partial<Post>): Promise<void> {
        try {
            await this.postDataAccess.updatePost(postId, updateData);
        } catch (error) {
            throw new Error(`Unable to update Post: ${(error as Error).message}`);
        }
    }

    async deletePost(postId: number): Promise<void> {
        try {
            await this.postDataAccess.deletePost(postId);
        } catch (error) {
            throw new Error(`Unable to delete Post: ${(error as Error).message}`);
        }
    }

    async countAllPosts(): Promise<Number> {
        const countPosts = await this.postDataAccess.countAllPosts();
        if (!countPosts) {
            throw new Error(`No posts found`);
        }
        return countPosts;
    }
}