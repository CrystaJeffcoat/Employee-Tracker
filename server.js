const inquirer = require("inquirer");
const orm = require("./config/orm.js");
const connection = require("./config/connection.js");
const add = require("./sources/add.js");
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

}

function updateData() {

}

function deleteData() {

}