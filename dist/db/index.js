import { pool } from "./connection.js";
export default class Db {
    constructor() {
        Object.defineProperty(this, "exit", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
    }
    async query(sql, args = []) {
        const client = await pool.connect();
        try {
            const result = await client.query(sql, args);
            return result;
        }
        catch (error) {
            console.error(error);
        }
        finally {
            client.release();
        }
    }
    findAllEmployees() {
        // THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
        const sql = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, '  ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;";
        return this.query(sql);
    }
    addNewEmployee(employee) {
        const { first_name, last_name, role_id, manager_id } = employee;
        const sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)";
        return this.query(sql, [first_name, last_name, role_id, manager_id]);
    }
    updateEmployeeRole(update) {
        const { name, role_id } = update;
        console.log(name, role_id);
        const sql = `UPDATE employee SET role_id = ${role_id} WHERE id = ${name}`;
        this.query(sql);
    }
    findAllRoles() {
        const sql = "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;";
        return this.query(sql);
    }
    findAllDepartments() {
        const sql = "SELECT * FROM department";
        return this.query(sql);
    }
    addRole(role) {
        const { role_title, role_salary, department_id } = role;
        const sql = "INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)";
        return this.query(sql, [role_title, role_salary, department_id]);
    }
    addDepartment(department_name) {
        const sql = "INSERT INTO department (name) VALUES ($1)";
        return this.query(sql, [department_name]);
    }
    quit() {
        this.exit = true;
    }
}
