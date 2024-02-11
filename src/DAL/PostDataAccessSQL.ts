import pool from '../../db';
import Post from '../Models/Post';
import User from '../Models/User';
import { DataAccess } from './DataAccess';
import {QueryResultRow} from 'pg';

export class PostDataAccessSQL implements DataAccess <Post>{

    async add(post: Post): Promise<void> {
        const query = 'INSERT INTO post (title, description, body, posted_by) VALUES ($1, $2, $3, $4)';
        await pool.query(query, [post.title, post.description, post.body, post.posted_by]);
    }

    async getALL(text?: string, from?: number, to?: number):Promise<Partial<Post>[]>{
        const query = 'SELECT id, title, description FROM post ORDER BY title';
        const queryPaging = 'SELECT * FROM post ORDER BY title LIMIT $2 OFFSET $1';
        const queryFilter = 'SELECT * FROM post "P" inner join "user" U ON "P".posted_by = U.u_id WHERE "P".title ILIKE $1 OR "P".description ILIKE $1 OR U.surname ILIKE $1 ORDER BY "P".title';
        const queryFilterAndPage = 'SELECT * FROM post "P" inner join "user" U ON "P".posted_by = U.u_id WHERE "P".title ILIKE $1 OR "P".description ILIKE $1 OR U.surname ILIKE $1 ORDER BY "P".title LIMIT $3 OFFSET $2';
        
        let result = await pool.query(query);

        // Filtering and Paging
        if(text && (from || to)) {
            result = (await pool.query(queryFilterAndPage, [`%${text}%`, from, to]));
        }
        
        // Paging
        if ((from || to) && !text) {
            if(from === undefined || to === undefined) {
                throw new Error('from and to must both be defined for paging');
              }

            result = (await pool.query(queryPaging, [from, to]));   
        }

        // filtering
        if (text && !(from || to)) {
            result = (await pool.query(queryFilter, [`%${text}%`]));   
        }

        if (result.rows.length === 0) {
            throw new Error(`No posts found`);
        }

        return result.rows;
    }

    async get(postId: number): Promise<Post> {
        const query = 'SELECT * FROM post WHERE id = $1';
        const result = await pool.query(query, [postId]);

        if (result.rows.length === 0) {
            throw new Error(`Post with ID ${postId} not found`);
        }

        return result.rows[0];
    }

    async update(postId: number, updateData: Partial<Post>): Promise<void> {
        let query = 'UPDATE post SET ';
        const updates: string[] = [];
        const values: (string | number)[] = [];
    
        Object.entries(updateData).forEach(([key, value], index) => {
            updates.push(`${key} = $${index + 1}`);
            values.push(value);
        });
    
        query += updates.join(', ') + ' WHERE id = $' + (values.length + 1);
        values.push(postId);
    
        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
            throw new Error(`Post with ID ${postId} not found`);
        }
    }
    

    async delete(postId: number): Promise<void> {
        const query = 'DELETE FROM post WHERE id = $1';
        const result = await pool.query(query, [postId]);
        if (result.rowCount === 0) {
            throw new Error(`Post with ID ${postId} not found`);
        }
    }
}