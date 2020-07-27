DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;
USE company_db;

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE emp_role (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL(10,2),
  department_id INT NOT NULL
);