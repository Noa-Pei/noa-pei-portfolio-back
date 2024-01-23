export interface DataAccess<Post> {
    addPost(post: Post): Promise<void>,
    deletePost(postId: number): Promise<void>,
    updatePost(postId: number, updateData: Partial<Post>): Promise<void>,
    getPost(postId: number): Promise<Post>,
    getALLPosts(text?: string, from?: number, to?: number): Promise<Partial<Post>[]>,
    countAllPosts(): Promise<Number>
}