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
describe('Posts API', () => {
    let postId;
    beforeEach(() => {
        (0, child_process_1.execSync)('npm run rebuild_db');
    });
    it('should create a new post', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post('/posts')
            .send({
            title: 'Test Post',
            body: 'Test body'
        });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        postId = res.body.id;
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
