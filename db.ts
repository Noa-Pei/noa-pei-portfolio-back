
import { Pool } from 'pg';

const pool = new Pool({
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

export default pool;