const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

client.connect();

const queries = {
  getAllDepartments: async () => {
    const res = await client.query('SELECT * FROM department');
    return res.rows;
  },

  getAllRoles: async () => {
    const res = await client.query(`
      SELECT role.id, role.title, role.salary, department.name AS department
      FROM role
      INNER JOIN department ON role.department_id = department.id
    `);
    return res.rows;
  },

  getAllEmployees: async () => {
    const res = await client.query(`
      SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
      CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employee
      LEFT JOIN role ON employee.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    `);
    return res.rows;
  },

  addDepartment: async (name) => {
    const res = await client.query('INSERT INTO department (name) VALUES ($1) RETURNING *', [name]);
    return res.rows[0];
  },

  addRole: async (title, salary, departmentId) => {
    const res = await client.query(
      'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *',
      [title, salary, departmentId]
    );
    return res.rows[0];
  },

  addEmployee: async (firstName, lastName, roleId, managerId) => {
    const res = await client.query(
      'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [firstName, lastName, roleId, managerId || null]
    );
    return res.rows[0];
  },

  updateEmployeeRole: async (employeeId, roleId) => {
    const res = await client.query(
      'UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *',
      [roleId, employeeId]
    );
    return res.rows[0];
  },
};

module.exports = queries;