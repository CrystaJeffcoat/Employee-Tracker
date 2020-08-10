const cTable = require('console.table');
const connection = require("../config/connection");

const view = {
  allEmployees: function() {
    let queryString = 
    `SELECT e.first_name, e.last_name, title, salary, department, 
    concat(m.first_name," ", m.last_name) as manager 
    FROM employee e
    left join employee m ON e.manager_id = m.id
    left JOIN emp_role ON e.role_id = emp_role.id
    left JOIN department ON emp_role.department_id = department.id`
    connection.query(queryString,function(err, result) {
      if (err) throw err;
      console.table(result);
    });
  },
  byDepartment: function() {
    let queryString = 
    `SELECT department, first_name, last_name 
    FROM employee e
    left JOIN emp_role ON e.role_id = emp_role.id
    left JOIN department ON emp_role.department_id = department.id
    order by department ASC`
    connection.query(queryString,function(err, result) {
      if (err) throw err;
      console.table(result);
    });
  },
  byManager: function() {
    let queryString = 
    `SELECT concat(m.first_name," ", m.last_name) as manager,
    department, e.first_name, e.last_name 
    FROM employee e
    join employee m ON e.manager_id = m.id
    left JOIN emp_role ON e.role_id = emp_role.id
    left JOIN department ON emp_role.department_id = department.id
    order by manager ASC`
    connection.query(queryString,function(err, result) {
      if (err) throw err;
      console.table(result);
    });
  },
  budget: function() {
    let queryString =
    `SELECT department, SUM(salary) as "total salaries"
    FROM department d
    join emp_role r ON r.department_id = d.id
    join employee e ON e.role_id = r.id
    group by department`
    connection.query(queryString,function(err, result) {
      if (err) throw err;
      console.table(result);
    });
  }
}

module.exports = view;