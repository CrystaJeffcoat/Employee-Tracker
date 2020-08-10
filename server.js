const inquirer = require("inquirer");
const orm = require("./config/orm.js");
const connection = require("./config/connection.js");
const add = require("./sources/add.js");
const view = require("./sources/view.js");

start();
function start() {
  inquirer
  .prompt({
    name: "Directory",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "Add",
      "View",
      "Update", 
      "Delete",
      "Exit"
    ]
  }).then(function(answer) {
    switch (answer.Directory) {
      case "Add":
        addData();
        break;
      case "View":
        viewData();
        break;
      case "Update":
        updateData();
        break;
      case "Delete":
        deleteData();
        break;
      default:
        connection.end();
    };
  });
};

function addData() {
  inquirer
  .prompt({
    name: "addData",
    type: "list",
    message: "What would you like to add?",
    choices: [
      "Department",
      "Role",
      "Employee",
      "Exit"
    ]
  })
  .then(function(answer) {
    if (answer.addData == "Department") {
      add.department();
    } 
    else if(answer.addData == "Role") {
      add.role();
    }
    else if(answer.addData == "Employee") {
      add.employee();
    }
    else {
      connection.end();
    }
  });
};

function viewData() {
  // view employees by department
  // view all employees
  // view employees by manager
  inquirer.prompt({
    name: "view",
    type: "list",
    message: "What would you like to view? ",
    choices: [
      "View all employees",
      "View employees by department",
      "View employees by manager",
      "View total utilized budget by department",
      "Exit"
    ]
  })
  .then(function(answer){
    switch(answer.view) {
      case "View all employees":
        view.allEmployees();
        break;
      case "View employees by department":
        view.byDepartment();
        break;
      case "View employees by manager":
        view.byManager();
        break;
      case "View total utilized budget by department":
        view.budget();
        break;
      default: 
        connection.end();
    }
  })
}

function updateData() {

}

function deleteData() {

}