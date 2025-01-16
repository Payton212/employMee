// importing classes from other files
import inquirer from "inquirer";
import { QueryResult } from "pg";
import department from "../interfaces/departments.js";
import role from "../interfaces/roles.js";
import employee from "../interfaces/employees.js";
//import * as fs from "fs";


  
class Cli {
    
constructor() { 
   
}
  
    originChoice(): void{
        inquirer.prompt([
            {
                type: "list",
                name: "firstAction",
                message: "what would you like to do?",
                choices: ["View All Employees", "Add Employees", "View All Roles", "Add Role", "View All Departments",
                    "Add Department", "Quit"],
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
        inquirer.prompt([
            {
                type: "input",
                name: "addDepartment",
                message: "what is the name of the department?",
            },
        ]).then((answers) => {
           
            
            this.originChoice();
        })
    }
    Quit() {
        throw new Error("Method not implemented.");
    }
}