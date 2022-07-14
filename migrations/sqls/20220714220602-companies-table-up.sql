CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(100),
    logo VARCHAR(255),
    title VARCHAR(100),
    sub_title VARCHAR(100),
    about VARCHAR(255),
    location VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    complaints_id int NOT NULL,
    reviews_id int NOT NULL,
    FOREIGN KEY(complaints_id) REFERENCES complaints(id),
    FOREIGN KEY(reviews_id) REFERENCES reviews(id)
);