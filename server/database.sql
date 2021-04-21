CREATE DATABASE example;

CREATE TABLE Login(
    login_id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    last_login TIMESTAMP,
    created_on TIMESTAMP
);