INSERT INTO department (name) VALUES ("Accounting");
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Sales");

INSERT INTO emp_role (title, salary, department_id) VALUES ("Manager", 120000, 3);
INSERT INTO emp_role (title, salary, department_id) VALUES ("Engineer", 43000, 2);
INSERT INTO emp_role (title, salary, department_id) VALUES ("Payroll", 45600, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Andrew", "Boyd", 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Brian", "Till", 2, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Sue", "Kowl", 2, 1);