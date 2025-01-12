// importing classes from other files
import inquirer from "inquirer";
import department from "./classes/departments.js";
import role from "./classes/roles.js";
import employee from "./classes/employees.js";

class Cli {
    constructor() { }
    
    originChoice(): void{
        inquirer.prompt([
            {
                type: "list",
                name: "firstAction",
                message: "what would you like to do?",
                choices: ["View All Employees","Add Employees", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
            },
        ])
            .then((answers) => {
                if (answers.firstAction === "View All Employees") {
                    this.ViewAllEmployees();
                } else if (answers.firstAction === "Add Employees") {
                    this.AddEmployee();
                } else if (answers.firstAction === "View All Roles") {
                    this.ViewRoles();
                } else if (answers.firstAction === "Add Role") {
                    this.AddRole();
                } else if (answers.firstAction === "View All Departments") {
                    this.ViewDepartments();
                } else if (answers.firstAction === "Add Department") {
                    this.AddDepartment();
                } else if (answers.firstAction === "Quit") {
                    this.Quit();
            }
        })
    }
    ViewAllEmployees() {
        throw new Error("Method not implemented.");
    }
    AddEmployee() {
        throw new Error("Method not implemented.");
    }
    ViewRoles() {
        throw new Error("Method not implemented.");
    }
    AddRole() {
        throw new Error("Method not implemented.");
    }
    ViewDepartments() {
        throw new Error("Method not implemented.");
    }
    AddDepartment() {
        throw new Error("Method not implemented.");
    }
    Quit() {
        throw new Error("Method not implemented.");
    }
}