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
    ('Noolis First Post', 'A short post to test things out', 'This is my first post on my new blog!', 1),
    ('Another Post', 'The second post is always harder', 'Coming up with things to write about is challenging!', 1),
    ('Guest Post', 'A visiting author writes on my blog', 'This is a post from another writer!', 2),
    ('Post by a New Writer', 'Another author writes on my blog', 'Getting popular ;)', 3);

DROP TABLE IF EXISTS public.user;
CREATE TABLE "user"
(
    u_id serial NOT NULL PRIMARY KEY,
    first_name character varying NOT NULL,
    surname character varying NOT NULL, 
    email character varying(255) NOT NULL
);

INSERT INTO "user" (first_name, surname, email)
VALUES 
    ('nooli', 'peiser', 'nool@yahoo.com'),
    ('nuli', 'pei', 'nul@hotmail.com'),
    ('noali', 'ser', 'noal@aol.com');
