const orm = require("../config/orm.js");
const inquirer = require("inquirer");
const empData = require("./view");

employeeArr = [];
employeeNames = [];

empIdArr = [];

empData.allEmployees(function(res){
  res.forEach(item => employeeArr.push(item));
  employeeArr.forEach(item => employeeNames.push(item.first_name + " " + item.last_name));
});

orm.getData("employee", function(res) {
  res.forEach(item => empIdArr.push(item));
})


const update = {
  role: function() {
    
    inquirer
    .prompt({
      name: "employee",
      type: "list",
      message: "Which employee's role do you want to update?",
      choices: managerArr
    })
    .then(function(answer) {

    });
  },
  manager: function() {
    inquirer
    .prompt([
      {
        name: "employee",
        type: "list",
        message: "Which employee's manager do you want to update?",
        choices: employeeNames
      },
      {
        name: "manager",
        type: "list",
        message: "Who do you want to set as manager for the selected employee?",
        choices: employeeNames
      }
    ])
    .then(function(answer) {
      // finds id of selected employee
      let empId = empIdArr.find(val => (val.first_name + " " + val.last_name) == answer.employee);
      // finds id of new manager
      let manId = empIdArr.find(val => (val.first_name + " " + val.last_name) == answer.manager);
      // sets new manager id to employee db
      orm.updateData("employee", { manager_id: manId.id },{ id: empId.id });
    });
  }
};

module.exports = update;