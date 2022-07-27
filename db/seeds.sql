INSERT INTO department (dept_name)
VALUES ('Human Resources'),
('Engineering'),
('Financial'),
('Company Executives'),
('IT'),
('Sales and Advertising');

INSERT INTO roles (title, salary, department_id)
VALUES ('HR Public Relations', 75000, 1),
('HR Strategist', 79000, 1),
('HR Director', 105000, 1),
('Junior Developer', 80000, 2),
('Junior Developer', 80000, 2),
('Senior Developer', 105000, 2),
('Senior Developer', 115000, 2),
('App Development Director', 135000, 2),
('Payroll Director', 95000, 3),
('Tax Accountant', 98000, 3),
('Senior Financial Officer', 108000, 3),
('Investor Relations Executive', 155000, 4),
('Chief Executive Officer', 550000, 4),
('Junior IT Associate', 75000, 5),
('Senior IT Associate', 91000, 5),
('Internet and Hardware Specialist', 95000, 5),
('Junior Sales Associate', 62000, 6),
('Junior Sales Associate', 62000, 6),
('Senior Sales Associate', 78,000, 6),
('Sales Strategist', 85000, 6),
('Senior Advertising Director', 120000, 6);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Li', 'Lin Ming', 1, NULL),
