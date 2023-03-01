CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(150) NOT NULL,
    user_id bigint NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);