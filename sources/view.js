const orm = require("../config/orm.js");
const cTable = require('console.table');

const view = {
  allEmployees: function() {
    orm.viewAllEmployees(function(res){
      console.table(res);
    });
  },
  byDepartment: function() {
    orm.byDepartment(function(res) {
      console.table(res);
    });
  },
  byManager: function() {
    orm.byManager(function(res) {
      console.table(res);
    });
  },
  budget: function() {
    orm.byBudget(function(res) {
      console.table(res);
    });
  }
}

module.exports = view;