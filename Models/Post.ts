class Post {
    id: number;
    title: string;
    description: string;
    body: string;

  
    constructor(id: number, title: string, description: string, body: string) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.body = body;
    }
  }
  export default Post;