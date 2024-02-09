DROP DATABASE IF exists my_blog;
CREATE DATABASE my_blog;
-- Connect to the desired database
\c my_blog;

DROP TABLE IF EXISTS public.post;
CREATE TABLE post
(
    id serial NOT NULL PRIMARY KEY,
    title character varying NOT NULL,
    description character varying NOT NULL, 
    body character varying,
    posted_by integer
);

INSERT INTO post (title, description, body, posted_by)
VALUES 
    ('My First Post', 'A short post to test things out', 'This is my first post on my new blog!', 1),
    ('Another Post', 'The second post is always harder', 'Coming up with things to write about is challenging!', 1),
    ('Guest Post', 'A visiting author writes on my blog', 'This is a guest post from another writer!', 2);
