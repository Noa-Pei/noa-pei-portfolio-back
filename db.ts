import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

export default pool;

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