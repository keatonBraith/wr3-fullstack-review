CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email VARCHAR(60),
    password TEXT,
    karma_score INT
);

CREATE TABLE posts(
post_id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(user_id),
body TEXT,
img TEXT,
karma_score INT
);

CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    body TEXT,
    comment_karma_score TEXT,
    post_id INT REFERENCES posts(post_id),
    user_id INT REFERENCES users(user_id)
);