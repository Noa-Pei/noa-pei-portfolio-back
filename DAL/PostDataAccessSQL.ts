// import pool from '../db';
// import Post from '../Models/Post';
// import { DataAccess } from './DataAccess';

// export class PostDataAccessSQL implements DataAccess <Post>{
//     async add(post: Post): Promise<void> {
//         const query = 'INSERT INTO posts (content, posted_by) VALUES ($1, $2)';
//         await pool.query(query, [post.content, post.postedBy]);
//     }

//     async get(postId: number): Promise<Post> {
//         const query = 'SELECT * FROM posts WHERE id = $1';
//         const result = await pool.query(query, [postId]);

//         if (result.rows.length === 0) {
//             throw new Error(`Post with ID ${postId} not found`);
//         }

//         return result.rows[0];
//     }

//     async update(postId: number, updateData: Partial<Post>): Promise<void> {
//         let query = 'UPDATE posts SET ';
//         const updates: string[] = [];
//         const values: (string | number)[] = [];
    
//         Object.entries(updateData).forEach(([key, value], index) => {
//             updates.push(`${key} = $${index + 1}`);
//             values.push(value);
//         });
    
//         query += updates.join(', ') + ' WHERE id = $' + (values.length + 1);
//         values.push(postId);
    
//         const result = await pool.query(query, values);
//         if (result.rowCount === 0) {
//             throw new Error(`Post with ID ${postId} not found`);
//         }
//     }
    

//     async delete(postId: number): Promise<void> {
//         const query = 'DELETE FROM posts WHERE id = $1';
//         const result = await pool.query(query, [postId]);
//         if (result.rowCount === 0) {
//             throw new Error(`Post with ID ${postId} not found`);
//         }
//     }
// }