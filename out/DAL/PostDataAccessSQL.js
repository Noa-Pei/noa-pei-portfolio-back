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
exports.PostDataAccessSQL = void 0;
const db_1 = __importDefault(require("../db"));
class PostDataAccessSQL {
    add(post) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO post (title, description, body, posted_by) VALUES ($1, $2, $3, $4)';
            yield db_1.default.query(query, [post.title, post.description, post.body, post.posted_by]);
        });
    }
    getALL(text, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT id, title, description FROM post ORDER BY title';
            const queryPaging = 'SELECT * FROM post ORDER BY title LIMIT $2 OFFSET $1';
            const queryFilter = 'SELECT * FROM post WHERE title ILIKE $1 OR description ILIKE $1 ORDER BY title';
            const queryFilterAndPage = 'SELECT * FROM post WHERE title ILIKE $1 OR description ILIKE $1 ORDER BY title LIMIT $3 OFFSET $2';
            let result = yield db_1.default.query(query);
            // Filtering and Paging
            if (text && (from || to)) {
                result = (yield db_1.default.query(queryFilterAndPage, [`%${text}%`, from, to]));
            }
            // Paging
            if ((from || to) && !text) {
                if (from === undefined || to === undefined) {
                    throw new Error('from and to must both be defined for paging');
                }
                result = (yield db_1.default.query(queryPaging, [from, to]));
            }
            // filtering
            if (text && !(from || to)) {
                result = (yield db_1.default.query(queryFilter, [`%${text}%`]));
            }
            if (result.rows.length === 0) {
                throw new Error(`No posts found`);
            }
            return result.rows;
        });
    }
    get(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM post WHERE id = $1';
            const result = yield db_1.default.query(query, [postId]);
            if (result.rows.length === 0) {
                throw new Error(`Post with ID ${postId} not found`);
            }
            return result.rows[0];
        });
    }
    update(postId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = 'UPDATE post SET ';
            const updates = [];
            const values = [];
            Object.entries(updateData).forEach(([key, value], index) => {
                updates.push(`${key} = $${index + 1}`);
                values.push(value);
            });
            query += updates.join(', ') + ' WHERE id = $' + (values.length + 1);
            values.push(postId);
            const result = yield db_1.default.query(query, values);
            if (result.rowCount === 0) {
                throw new Error(`Post with ID ${postId} not found`);
            }
        });
    }
    delete(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM post WHERE id = $1';
            const result = yield db_1.default.query(query, [postId]);
            if (result.rowCount === 0) {
                throw new Error(`Post with ID ${postId} not found`);
            }
        });
    }
}
exports.PostDataAccessSQL = PostDataAccessSQL;
