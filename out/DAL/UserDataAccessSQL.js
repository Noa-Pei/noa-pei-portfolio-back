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
exports.UserDataAccessSQL = void 0;
const db_1 = __importDefault(require("../db"));
class UserDataAccessSQL {
    add(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO "user" (first_name, surname) VALUES ($1, $2)';
            yield db_1.default.query(query, [user.first_name, user.surname]);
        });
    }
    getALL(text, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT u_id, first_name, surname FROM public.user ORDER BY surname';
            // const queryFilterAndPage = 'SELECT * FROM post WHERE user.surname ILIKE $1 ORDER BY post.title LIMIT $3 OFFSET $2';
            let result = yield db_1.default.query(query);
            // // Filtering and Paging
            // if(text && (from || to)) {
            //     result = (await pool.query(queryFilterAndPage, [`%${text}%`, from, to]));
            // }
            // // filtering
            // if (text && !(from || to)) {
            //     result = (await pool.query(queryFilter, [`%${text}%`]));   
            // }
            if (result.rows.length === 0) {
                throw new Error(`No users found`);
            }
            return result.rows;
        });
    }
    get(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM public.user WHERE u_id = $1';
            const result = yield db_1.default.query(query, [userId]);
            if (result.rows.length === 0) {
                throw new Error(`User with ID ${userId} not found`);
            }
            return result.rows[0];
        });
    }
    update(userId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = 'UPDATE public.user SET ';
            const updates = [];
            const values = [];
            Object.entries(updateData).forEach(([key, value], index) => {
                updates.push(`${key} = $${index + 1}`);
                values.push(value);
            });
            query += updates.join(', ') + ' WHERE u_id = $' + (values.length + 1);
            values.push(userId);
            const result = yield db_1.default.query(query, values);
            if (result.rowCount === 0) {
                throw new Error(`User with ID ${userId} not found`);
            }
        });
    }
    delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM public.user WHERE u_id = $1';
            const result = yield db_1.default.query(query, [userId]);
            if (result.rowCount === 0) {
                throw new Error(`User with ID ${userId} not found`);
            }
        });
    }
}
exports.UserDataAccessSQL = UserDataAccessSQL;
