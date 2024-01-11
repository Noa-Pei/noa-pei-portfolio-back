"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InMemoryDB {
    constructor() {
        this.posts = new Map();
    }
    static getInstance() {
        if (!InMemoryDB.instance) {
            InMemoryDB.instance = new InMemoryDB();
        }
        return InMemoryDB.instance;
    }
    // Post Methods
    addPost(post) {
        this.posts.set(post.id, post);
    }
    getALLPosts(options) {
        let posts = Array.from(this.posts.values()).map(post => {
            return {
                // id: post.id,
                title: post.title,
                description: post.description,
                // body: post.body
            };
        });
        // Filtering by text
        if (options === null || options === void 0 ? void 0 : options.text) {
            const text = options.text;
            posts = posts.filter(post => {
                return post.title.includes(text) || post.description.includes(text);
            });
        }
        // Paging
        if ((options === null || options === void 0 ? void 0 : options.from) || (options === null || options === void 0 ? void 0 : options.to)) {
            posts = posts.slice(options === null || options === void 0 ? void 0 : options.from, options === null || options === void 0 ? void 0 : options.to);
        }
        return posts;
    }
    getPost(id) {
        return this.posts.get(id);
    }
    updatePost(id, postData) {
        let post = this.posts.get(id);
        if (post) {
            // Update attributes of the post
            post = Object.assign(Object.assign({}, post), postData);
            this.posts.set(id, post);
        }
    }
    deletePost(id) {
        this.posts.delete(id);
    }
}
exports.default = InMemoryDB;
