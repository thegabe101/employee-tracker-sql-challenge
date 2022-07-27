DROP DATABASE IF EXISTS ouremployees_db;
CREATE DATABASE ouremployees_db;

USE ouremployees_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT, 
    FOREIGN KEY (department_id) REFERENCES department (id),
    PRIMARY KEY (id)
);

