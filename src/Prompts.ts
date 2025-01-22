// importing classes from other files
import inquirer from "inquirer";
import Db from "./db/index.js";

const db = new Db();

function originChoice(): void {
  // THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee,and update an employee role
  inquirer
    .prompt([
      {
        type: "list",
        name: "firstAction",
        message: "what would you like to do?",
        choices: [
          {
            name: "View All Employees",
            value: "VIEW_EMPLOYEES",
          },
          {
            name: "Add Employees",
            value: "ADD_EMPLOYEE",
          },
          {
            name: "View All Roles",
            value: "VIEW_ROLES",
          },
          {
            name: "Add Role",
            value: "ADD_ROLE",
          },
          {
            name: "View All Departments",
            value: "VIEW_DEPARTMENTS",
          },
          {
            name: "Add Department",
            value: "ADD_DEPARTMENT",
          },
          {
            name: "Update Employee",
            value: "UPDATE_EMPLOYEE",
          },
          {
            name: "Quit",
            value: "QUIT",
          },
        ],
      },
    ])
    .then((res) => {
      const choice = res.firstAction;
      switch (choice) {
        case "VIEW_EMPLOYEES":
          ViewAllEmployees();
          break;
        case "ADD_EMPLOYEE":
          AddEmployee();
          break;
        case "VIEW_ROLES":
          ViewRoles();
          break;
        case "ADD_ROLE":
          AddRole();
          break;
        case "VIEW_DEPARTMENTS":
          ViewDepartments();
          break;
        case "ADD_DEPARTMENT":
          AddDepartment();
          break;
        case "UPDATE_EMPLOYEE":
          updateEmployee();
          break;
        case "QUIT":
          Quit();
          break;
        default:
          Quit();
      }
    });
}
function ViewAllEmployees() {
  db.findAllEmployees()
    .then((res) => {
      const employees = res?.rows;
      console.table(employees);
    })
    .then(() => originChoice());
}
function AddEmployee() {
  // THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "what is the Employee's first name",
      },
      {
        type: "input",
        name: "lastName",
        message: "what is the employee's last name?",
      },
    ])
    .then((res) => {
      const firstName = res.firstName;
      const lastName = res.lastName;

      db.findAllRoles().then((response) => {
        const roles = response?.rows;
        const roleChoice = roles?.map((role) => {
          const id = role.id;
          const title = role.title;
          return { name: title, value: id };
        });
        inquirer
          .prompt([
            {
              type: "list",
              name: "roleId",
              message: "What role will this employee have?",
              choices: roleChoice,
            },
          ])
          .then((res) => {
            const roleId = res?.roleId;
            db.findAllEmployees().then((response) => {
              const employees = response?.rows;
              const managerChoices = employees?.map((employee) => {
                const id = employee.id;
                const firstName = employee.first_name;
                const lastName = employee.last_name;
                return {
                  name: `${firstName} ${lastName}`,
                  value: id,
                };
              });
              managerChoices?.unshift({ name: "none", value: null });
             
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "ManagerList",
                    message: "whos is this employees manager?",
                    choices: managerChoices,
                  },
                ])
                .then((res) => {
                  const employee = {
                    first_name: firstName,
                    last_name: lastName,
                    manager_id: res.ManagerList,
                    role_id: roleId,
                  };
                  db.addNewEmployee(employee);
                })
                .then(() => {
                  console.log(`Added ${firstName} ${lastName} to the database`);
                })
                .then(() => originChoice());
            });
          });
      });
    })
    .then(() => originChoice());
}
function ViewRoles() {
  // THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
  db.findAllRoles().then((response) => {
    const roles = response?.rows;
    console.table(roles);
  }).then(() => originChoice());
}
function AddRole() {
  // THEN I am prompted to enter the name, salary, and department for the  role and that role is added to the database
  inquirer
    .prompt([
      {
        type: "input",
        name: "addRole",
        message: "What is the name of the new Role?",
      },
      {
        type: "input",
        name: "salary",
        message: "what is this employees salary?", 
      },
    ])
    .then((response) => {
      const roleName = response.addRole;
      const salary = response.salary;

      db.findAllDepartments().then((res) => {
        const departments = res?.rows;
        const departmentChoices = departments?.map((department) => {
          const id = department.id;
          const name = department.name;
          return { name: name, value: id };
        });
        inquirer.prompt([
          {
            type: "list",
            name: "departmentChoice",
            message: "please select a department for this role",
            choices: departmentChoices
          },
        ]).then((response) => {
          const role = {
            role_title: roleName,
            role_salary: salary,
            department_id: response.departmentChoice,
          };
          db.addRole(role);
        }).then(() => {
          console.log(`${roleName} has been added to the database!`);
        }).then(() => originChoice());
      })
    });
}
function ViewDepartments() {
  // THEN I am presented with a formatted table showing department names and department ids
  db.findAllDepartments().then((res) => {
    const department = res?.rows;
    console.table(department);
  }).then(() => originChoice());

}
function AddDepartment() {
  // THEN I am prompted to enter the name of the department and that department is added to the database
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDepartment",
        message: "What is the name of the department?",
      },
    ])
    .then((response) => {
      const departmentName = response.addDepartment;

      db.addDepartment(departmentName).then(() => {
        console.log(`${departmentName} has been added to the database`);
      }).then(() => originChoice());
    });
}
function updateEmployee(){
  db.findAllEmployees().then((res) => {
    const employees = res?.rows;
    const employeeChoice = employees?.map((employee) => {
      const first_name = employee.first_name;
      const last_name = employee.last_name;
      const id = employee.id
      return {
        name: `${first_name} ${last_name}`,
        value: id,
      };
    });
    inquirer.prompt([
      {
        type: "list",
        name: "employees",
        message: "what employee would you like to Update?",
        choices: employeeChoice,
      },
    ]).then((res) => {
      const employee = res.employees;
      db.findAllRoles().then((res) => {
        const roles = res?.rows;
        const roleChoice = roles?.map((role) => {
          const id = role.id;
          const title = role.title;
          return { name: title, value: id };
        });
        inquirer
          .prompt([
            {
              type: "list",
              name: "roles",
              message: "what role would you like to update this employee to?",
              choices: roleChoice,
            },
          ])
          .then((res) => {
            const update = {
              name: employee,
              role_id: res.roles,
            };
            db.updateEmployeeRole(update);
          })
          .then(() => {
            console.log(`employee role has been updated`);
          }).then(() => originChoice());
      });
    });
  });
}
function Quit() {
  db.quit();
}

export default originChoice();


