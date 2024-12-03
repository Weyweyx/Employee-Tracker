const inquirer = require('inquirer');
const consoleTable = require('console.table');
const queries = require('./utils/queries');
require('dotenv').config();

const mainMenu = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update Employee Role',
        'Exit',
      ],
    },
  ]);

  switch (action) {
    case 'View All Departments':
      return viewDepartments();
    case 'View All Roles':
      return viewRoles();
    case 'View All Employees':
      return viewEmployees();
    case 'Add a Department':
      return addDepartment();
    case 'Add a Role':
      return addRole();
    case 'Add an Employee':
      return addEmployee();
    case 'Update Employee Role':
      return updateEmployeeRole();
    case 'Exit':
      console.log('Goodbye!');
      process.exit(0);
  }
};

const viewDepartments = async () => {
  const departments = await queries.getAllDepartments();
  console.table(departments);
  mainMenu();
};

const viewRoles = async () => {
  const roles = await queries.getAllRoles();
  console.table(roles);
  mainMenu();
};

const viewEmployees = async () => {
  const employees = await queries.getAllEmployees();
  console.table(employees);
  mainMenu();
};

const addDepartment = async () => {
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the department:',
    },
  ]);
  const department = await queries.addDepartment(name);
  console.log(`Added department:`, department);
  mainMenu();
};

const addRole = async () => {
  const { title, salary, departmentId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the role title:',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the role salary:',
    },
    {
      type: 'input',
      name: 'departmentId',
      message: 'Enter the department ID for this role:',
    },
  ]);
  const role = await queries.addRole(title, salary, departmentId);
  console.log(`Added role:`, role);
  mainMenu();
};

const addEmployee = async () => {
  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: "Enter the employee's first name:",
    },
    {
      type: 'input',
      name: 'lastName',
      message: "Enter the employee's last name:",
    },
    {
      type: 'input',
      name: 'roleId',
      message: "Enter the employee's role ID:",
    },
    {
      type: 'input',
      name: 'managerId',
      message: "Enter the manager's ID (leave blank if none):",
    },
  ]);
  const employee = await queries.addEmployee(firstName, lastName, roleId, managerId);
  console.log(`Added employee:`, employee);
  mainMenu();
};

const updateEmployeeRole = async () => {
  const { employeeId, newRoleId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'employeeId',
      message: "Enter the ID of the employee whose role you want to update:",
    },
    {
      type: 'input',
      name: 'newRoleId',
      message: "Enter the new role ID for this employee:",
    },
  ]);
  const updatedEmployee = await queries.updateEmployeeRole(employeeId, newRoleId);
  console.log(`Updated employee's role:`, updatedEmployee);
  mainMenu();
};

mainMenu();