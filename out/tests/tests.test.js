"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const child_process_1 = require("child_process");
describe('Posts API - CRUD', () => {
    let postId = 1;
    beforeAll(() => {
        (0, child_process_1.execSync)('npm run rebuild_db');
    });
    it('should create a new post', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post('/posts')
            .send({
            title: 'Test Post',
            description: 'Test Description',
            body: 'Test body'
        });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe("Post created successfully");
    }));
    it('should get all posts', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get('/posts');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    }));
    // it('should filter posts by title', async () => {
    //   const title = 'Test'; 
    //   const res = await request(app).get(`/posts?text=${title}`);
    //   expect(res.status).toBe(200);
    //   expect(res.body.length).toBeGreaterThan(0);
    //   expect(res.body[0].title).toContain(title);
    // });
    it('should combine filter and pagination', () => __awaiter(void 0, void 0, void 0, function* () {
        const title = 'Test post';
        const res = yield (0, supertest_1.default)(index_1.default).get(`/posts?from=0&to=2&text=${title}`);
        expect(res.body.length).toBeLessThanOrEqual(2);
        expect(res.body[0].title).toContain(title);
    }));
    it('should get a post by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get(`/posts/${postId}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(postId);
    }));
    it('should update a post', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .put(`/posts/${postId}`)
            .send({
            title: 'Updated Title'
        });
        expect(res.status).toBe(200);
    }));
    it('should delete a post', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .delete(`/posts/${postId}`);
        expect(res.status).toBe(200);
    }));
});
