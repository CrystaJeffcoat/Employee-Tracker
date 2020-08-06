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
  })
  .then(function(name) {
    orm.addData("Department", {name: name.dept});
  });
}
function addRole() {
  connection.query("SELECT * FROM department", function(err, results){
    if(err) throw err;
    inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Enter job title: ",
      },
      {
        name: "salary",
        type: "input",
        message: "Enter title salary: ",
        validate: function(val) {
          if(isNaN(val) === false) {
            return true;
          }
          return "Please enter a valid number";
        }
      },
      {
        name: "dept",
        type: "rawlist",
        message: "Choose department for this role: ",
        choices: function() {
          let choiceArr = [];
          for (var i = 0; i < results.length; i++) {
            choiceArr.push(results[i]);
          };
          return choiceArr;
        }
      }
    ])
    .then(async function(answer){
      let dept;
      for (i = 0; i < results.length; i++) {
        if (results[i].name == answer.dept) {
          dept = results[i].id
        }
      }
      orm.addData("emp_role",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: await dept
        }
      );
    });
  });
};

function viewData() {

}

function updateData() {

}

function deleteData() {

}