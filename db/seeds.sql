INSERT INTO department (name)
VALUES ('Engineering'), ('Sales'), ('Finance');

INSERT INTO role (title, salary, department_id)
VALUES ('Software Engineer', 120000, 1), ('Salesperson', 60000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL), ('Jane', 'Smith', 2, 1);