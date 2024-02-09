class Post {
    id: number;
    title: string;
    description: string;
    body: string;
    posted_by: number

  
    constructor(id: number, title: string, description: string, body: string, posted_by: number) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.body = body;
      this.posted_by = posted_by
    }
  }
  export default Post;