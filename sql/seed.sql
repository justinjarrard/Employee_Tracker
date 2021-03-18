USE employees_db;

INSERT INTO departments (name)
VALUES ('Sales'),
	('Engineering'),
    ('Finance'),
    ('Marketing'),
    ('Legal');
    
USE employees_db;

INSERT INTO roles (title, ​salary, department_id)
VALUES ('Sales Lead', 100000, 1),
	('Salesperson', 80000, 1),
	('Software Engineer', 120000, 2),
	('Account Manager', 160000, 3),
	('Accountant', 125000, 3),
	('Legal Team Lead', 250000, 4),
	('Lawyer', 190000, 4);

USE employees_db;

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('David', 'Daniels', 1, NULL),
('Scott', 'Miller', 2, 1),
('Jessica', 'Rodriguez', 3, NULL),
('Travis', 'Driver', 4, NULL),
('Lucas', 'Glover', 5, 2),
('Sharice', 'Brown', 5, NULL),
('Joe', 'Volosky', 4, 3),
('Jayme', 'Roberts', 3, 1);

	