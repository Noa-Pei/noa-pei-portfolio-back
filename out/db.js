"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = new pg_1.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});
exports.default = pool;
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'noa-pei-portfolio',
//     password: 'watermelon',
//     port: 5432,
// });
// export default pool;
// const pool = new Pool({
//     user: 'fcpxedhm',
//     host: 'rogue.db.elephantsql.com',
//     database: 'fcpxedhm',
//     password: 'NqRi4HXzM-hIhtUZitM-_HSZuleHxXFH',
//     port: 5432,
// });
