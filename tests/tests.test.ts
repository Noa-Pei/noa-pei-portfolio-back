import request from 'supertest';
import app from '../index';
import { execSync } from 'child_process';

describe('Posts API', () => {

  let postId: number = 1;

  beforeAll(() => {
    execSync('npm run rebuild_db');
  });

  it('should create a new post', async () => {  
    const res = await request(app)
      .post('/posts')
      .send({
        title: 'Test Post',
        description: 'Test Description',
        body: 'Test body',
        posted_by: 1 
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message');
    expect(res.body. message).toBe("Post created successfully");
  });

  it('should get all posts', async () => {
    const res = await request(app).get('/posts');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should filter posts by surname', async () => {
    const surname = 'peis'; 

    const res = await request(app).get(`/posts?text=${surname}`);
    
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].surname).toContain(surname);
  });

  it('should paginate result equals or less than 2', async () => {
    const res = await request(app).get(`/posts?from=0&to=3`);
    expect(res.body.length).toBeLessThanOrEqual(3); 
  });

  it('should combine filter and pagination', async () => {
    const title = 'Test Post';
    const res = await request(app).get(`/posts?from=0&to=2&text=${title}`);
    expect(res.body.length).toBeLessThanOrEqual(2); 
    expect(res.body[0].title).toContain(title);
  });


  it('should get a singular post', async () => {
    const res = await request(app).get(`/posts/${postId}`);
    expect(res.status).toBe(200); 
    expect(res.body.id).toBe(postId);
  });

  it('should update a post', async () => {
    const res = await request(app)  
      .put(`/posts/${postId}`)
      .send({
        title: 'Updated Title'
      });

    expect(res.status).toBe(200);
  });

  it('should delete a post', async() => {
    const res = await request(app)
      .delete(`/posts/${postId}`);

    expect(res.status).toBe(200);
  });
    
});

describe('Users API', () => {

  let userId: number = 1;

  beforeAll(() => {
    execSync('npm run rebuild_db');
  });

  it('should add anew user to DB', async () => {  
    const res = await request(app)
      .post('/users')
      .send({
        first_name: 'Test User first name',
        surname: 'Test User last name',
        email: 'test@email.com'  
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message');
    expect(res.body. message).toBe("User created successfully");
  });

  it('should get all users', async () => {
    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should get a specific user', async () => {
    const res = await request(app).get(`/users/${userId}`);
    expect(res.status).toBe(200); 
    expect(res.body.u_id).toBe(userId);
  });

  it('should update a specific user', async () => {
    const res = await request(app)  
      .put(`/users/${userId}`)
      .send({
        email: 'updated@email.com'
      });

    expect(res.status).toBe(200);
  });

  it('should delete a specific user', async() => {
    const res = await request(app)
      .delete(`/users/${userId}`);

    expect(res.status).toBe(200);
  });
    
});

