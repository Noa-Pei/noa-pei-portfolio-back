
import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'noa-pei-portfolio',
    password: 'watermelon',
    port: 5432,
});

export default pool;