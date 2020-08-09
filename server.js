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
  let dept = [];

  orm.getData("department", function(res){
    res.forEach(item => dept.push(item));
  });

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
      choices: dept
    }
  ])
  .then((answer) => {
    let deptId = dept.find(val => val.name == answer.dept);

    orm.addData("emp_role",
      {
        title: answer.title,
        salary: answer.salary,
        department_id: deptId.id
      }
    );
  });
};

function addEmployee() {
  let managerArr = [];
  let managerNames = [];
  let roleArr = [];
  let roleNames = []; 

  orm.getData("employee", function(res){
    res.forEach(item => managerArr.push(item));
    managerArr.forEach(item => managerNames.push(item.first_name + " " + item.last_name));
  });
  orm.getData("emp_role", function(res){
    res.forEach(item => roleArr.push(item));
    roleArr.forEach(item => roleNames.push(item.title));
  });

  inquirer.prompt([
    {
      name: "first",
      type: "input",
      message: "Enter employees first name: "
    },
    {
      name: "last",
      type: "input",
      message: "Enter employees last name: "
    },
    {
      name: "role",
      type: "rawlist",
      message: "What is the employees role? ",
      choices: roleNames
    },
    {
      name: "manager",
      type: "list",
      message: "Who is the employees manager? ",
      choices: managerNames
    }
  ])
  .then((answer) => {
    let roleId = roleArr.find(val => val.title == answer.role);
    console.log(roleId);
    let managerId = managerArr.find(val => (val.first_name + " " + val.last_name) == answer.manager);
    console.log(managerId);

    orm.addData("employee", {
      first_name: answer.first,
      last_name: answer.last,
      role_id: roleId.id,
      manager_id: managerId.id
    });
  });
};

function viewData() {

}

function updateData() {

}

function deleteData() {

}