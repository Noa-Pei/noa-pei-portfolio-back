import pool from '../../db';
import User from '../Models/User';
import { DataAccess } from './DataAccess';
import {QueryResultRow} from 'pg';

export class UserDataAccessSQL implements DataAccess <User>{
    async add(user: User){
        const query = 'INSERT INTO "user" (first_name, surname) VALUES ($1, $2)';
        await pool.query(query, [user.first_name, user.surname]);
    }

    async getALL(text?: string, from?: number, to?: number):Promise<Partial<User>[]>{
        const query = 'SELECT u_id, first_name, surname FROM public.user ORDER BY surname';
        // const queryFilterAndPage = 'SELECT * FROM post WHERE user.surname ILIKE $1 ORDER BY post.title LIMIT $3 OFFSET $2';
        
        let result = await pool.query(query);

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
    }

    async get(userId: number): Promise<User> {
        const query = 'SELECT * FROM public.user WHERE u_id = $1';
        const result = await pool.query(query, [userId]);

        if (result.rows.length === 0) {
            throw new Error(`User with ID ${userId} not found`);
        }
        return result.rows[0];        
    }

    async update(userId: number, updateData: Partial<User>): Promise<void> {
        let query = 'UPDATE public.user SET ';
        const updates: string[] = [];
        const values: (string | number)[] = [];
    
        Object.entries(updateData).forEach(([key, value], index) => {
            updates.push(`${key} = $${index + 1}`);
            values.push(value);
        });
    
        query += updates.join(', ') + ' WHERE u_id = $' + (values.length + 1);
        values.push(userId);
    
        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
            throw new Error(`User with ID ${userId} not found`);
        }
    }

    async delete(userId: number): Promise<void> {
        const query = 'DELETE FROM public.user WHERE u_id = $1';
        const result = await pool.query(query, [userId]);
        
        if (result.rowCount === 0) {
            throw new Error(`User with ID ${userId} not found`);
        }
    }
}