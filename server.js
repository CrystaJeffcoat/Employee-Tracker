const inquirer = require("inquirer");
const connection = require("./config/connection");
const add = require("./sources/add");
const view = require("./sources/view");
const update = require("./sources/update");
const remove = require("./sources/remove");
const cTable = require('console.table');

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
      start();
    };
  });
};

function viewData() {
  // view employees by department
  // view all employees
  // view employees by manager
  inquirer.prompt({
    name: "view",
    type: "list",
    message: "What would you like to view?",
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
        view.allEmployees(function(res) {
          console.table(res);
        });
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
        start();
    };
  });
};

function updateData() {
  inquirer.prompt({
    name: "update",
    type: "list",
    message: "What would you like to update",
    choices: ["Employee role", "Employee manager", "Exit"]
  })
  .then(function(answer){
    if (answer.update == "Employee role") {
      update.role();
    } else if (answer.update == "Employee manager") {
      update.manager();
    } else {
      start();
    };
  });
};

function deleteData() {
  inquirer.prompt({
    name: "delete",
    type: "list", 
    message: "What do you want to remove?",
    choices: ["Employees", "Roles", "Exit"]
  })
  .then(function(answer) {
    if (answer.delete == "Employees") {
      remove.employee();
    } else if (answer.delete == "Roles") {
      remove.role();
    } else {
      start();
    };
  });
};