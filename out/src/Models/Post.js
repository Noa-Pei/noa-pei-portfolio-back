"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Post {
    constructor(id, title, description, body, posted_by) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.body = body;
        this.posted_by = posted_by;
    }
}
exports.default = Post;
