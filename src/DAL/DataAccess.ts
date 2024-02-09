// export interface DataAccess<Post> {
//     addPost(post: Post): Promise<void>,
//     deletePost(postId: number): Promise<void>,
//     updatePost(postId: number, updateData: Partial<Post>): Promise<void>,
//     getPost(postId: number): Promise<Post>,
//     getALLPosts(text?: string, from?: number, to?: number): Promise<Partial<Post>[]>,
//     countAllPosts(): Promise<Number>
// }

export interface DataAccess<T> {
    add(t: T): Promise<void>,
    delete(id: number): Promise<void>,
    update(id: number, updateData: Partial<T>): Promise<void>,
    get(id: number): Promise<T>,
}

    // getALL(text?: string, from?: number, to?: number): Promise<Partial<T>[]>,
    // countAll(): Promise<Number>

