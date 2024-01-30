"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'noa-pei-portfolio',
    password: 'watermelon',
    port: 5432,
});
// const pool = new Pool({
//     user: 'fcpxedhm',
//     host: 'rogue.db.elephantsql.com',
//     database: 'noa-pei-portfolio',
//     password: 'NqRi4HXzM-hIhtUZitM-_HSZuleHxXFH',
//     port: 5432,
// });
exports.default = pool;
