const orm = require("../config/orm.js");
const inquirer = require("inquirer");

roleTitles = [];
empArr = [];
empNames = [];

orm.getData("emp_role", function(res) {
  res.forEach(item => roleTitles.push(item.title));
});

orm.getData("employee", function(res) {
  res.forEach(item => empArr.push(item));
  res.forEach(item => empNames.push(item.first_name + " " + item.last_name));
});

const remove = {

  role: function() {
    inquirer
    .prompt({
      name: "role",
      type: "list",
      message: "Which role would you like to delete?",
      choices: roleTitles
    })
    .then(function(answer) {
      orm.delete("emp_role", { title: answer.role });
    });
  },
  employee: function() {
    inquirer
    .prompt({
      name:"emp",
      type: "list", 
      message: "Which employee would you like to remove?",
      choices: empNames
    })
    .then(function(answer) {
      let empId = empArr.find(val => (val.first_name + " " + val.last_name) == answer.emp);
      orm.delete("employee", { id: empId.id });
    })
  }
}

module.exports = remove;