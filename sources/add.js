const inquirer = require("inquirer");
const orm = require("../config/orm.js");

// This file holds functions to add employees, roles, and departments to the database

const add = {
  department: function() {
    inquirer
    .prompt({
      name: "dept",
      type: "input",
      message: "Enter department name: "
    })
    .then(function(name) {
      orm.addData("Department", {department: name.dept});
    });
  },
  role: function() {
    let dept = [];
    let deptArr = [];
  
    orm.getData("department", function(res){
      res.forEach(item => dept.push(item));
      res.forEach(item => deptArr.push(item.department));
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
        choices: deptArr
      }
    ])
    .then((answer) => {
      let deptId = dept.find(val => val.department == answer.dept);
  
      orm.addData("emp_role",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: deptId.id
        }
      );
    });
  },
  employee: function() {
    let managerArr = [];
    let managerNames = ["None"];
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
      let managerId;

      if (answer.manager == undefined) {
        managerId = "NULL"
      } else {
        managerId = managerArr.find(val => (val.first_name + " " + val.last_name) == answer.manager)
      }
      orm.addData("employee", {
        first_name: answer.first,
        last_name: answer.last,
        role_id: roleId.id,
        manager_id: managerId.id
      });
    });
  }
}

module.exports = add;