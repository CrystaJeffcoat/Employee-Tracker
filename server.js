const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "",
  
  database: "company_db"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start() {
  inquirer
  .prompt({
    name: "Directory",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View all employees", 
      "View employee by department", 
      "View employee by Manager", 
      "Add employee", 
      "Remove employee", 
      "Update employee", 
      "View all roles",
      "Exit"
    ]
  }).then(function(answer) {
    switch (answer.Directory) {
      case "View all employees":
        
        break;
      case "View employee by department":
        
        break;
      case "View employee by Manager":
        
        break;
      case "Add employee":
        addEmployee();
        break;
      case "Remove employee":
        
        break;
      case "Update employee":
        
        break;
      case "View all roles":
        
      default:
        connection.end();
    };
  });
};

function addEmployee() {
  inquirer
  .prompt([
    {
      name: "first_name",
      type: "input",
      message: "What is the employee's first name?"
    },
    {
      name: "last_name",
      type: "input",
      message: "What is the employee's last name?"
    },
    {
      name: "employee_role",
      type: "input",
      message: "What is the employee's role?"
    },
    {
      name: "employee_manager",
      type: "input",
      message: "Who is the employee's manager?"
    },
  ])
  .then(function(answers){
    // add data to db
  })
};