const inquirer = require("inquirer");
const orm = require("./config/orm.js");
const connection = require("./config/connection.js");

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
      addDepartment();
    } 
    else if(answer.addData == "Role") {
      addRole();
    }
    else if(answer.addData == "Employee") {
      addEmployee();
    }
    else {
      connection.end();
    }
  });
};

function addDepartment() {
  inquirer
  .prompt({
    name: "dept",
    type: "input",
    message: "Enter department name: "
  }).then(function(name) {
    orm.addData("Department", {name: name.dept});
  });
}

function viewData() {

}

function updateData() {

}

function deleteData() {

}