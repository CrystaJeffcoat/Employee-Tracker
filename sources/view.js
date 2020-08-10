const inquirer = require("inquirer");
const orm = require("../config/orm.js");
const cTable = require('console.table');

const view = {
  allEmployees: function() {
    orm.viewAllEmployees(function(res){
      console.table(res);
    })

  }
}

module.exports = view;