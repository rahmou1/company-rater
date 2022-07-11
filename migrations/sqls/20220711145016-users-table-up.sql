-- create users table
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    user_name VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    working_company VARCHAR(50),
    password VARCHAR(255) NOT NULL,
    profile_pic VARCHAR(255) 
);