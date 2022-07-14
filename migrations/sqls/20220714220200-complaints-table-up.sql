CREATE TABLE complaints (
    id SERIAL PRIMARY KEY,
    complaint VARCHAR(255) NOT NULL,
    status int NOT NULL DEFAULT 1,
    users_id int NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(users_id) REFERENCES users(id)
);