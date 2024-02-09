import Post from '../src/Models/Post';

class InMemoryDB {
    private static instance: InMemoryDB;
    private posts: Map<number, Post> = new Map();

    private constructor() {}

    public static getInstance(): InMemoryDB {
        if (!InMemoryDB.instance) {
            InMemoryDB.instance = new InMemoryDB();
        }
        return InMemoryDB.instance;
    }

    // Post Methods
    addPost(post: Post) {
      this.posts.set(post.id, post);
    }

    getALLPosts(options?: {text?: string; from?: number; to?: number;}): Partial<Post>[]{
        let posts = Array.from(this.posts.values()).map(post => {
            return {
                // id: post.id,
                title: post.title,  
                description: post.description,
                // body: post.body
            };
        })

        // Filtering by text
        if (options?.text) {
            const text = options.text; 
            posts = posts.filter(post => {
                return post.title.includes(text) || post.description.includes(text);
            });
        }
        
        // Paging
        if (options?.from || options?.to) {
            posts = posts.slice(options?.from, options?.to); 
        }
        return posts;
    }
  
    getPost(id: number): Post | undefined {
      return this.posts.get(id);
    }
  
    updatePost(id: number, postData: Partial<Post>) {
      let post = this.posts.get(id);
      if (post) {
        // Update attributes of the post
        post = {...post, ...postData};
        this.posts.set(id, post);
      }
    }
  
    deletePost(id: number) {
      this.posts.delete(id);
    }
  }
  export default InMemoryDB;