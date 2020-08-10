const connection = require("./connection");

const orm = {
  getData: function(tableName, cb) {
    let queryString = "SELECT * FROM " + tableName 
    connection.query(queryString, function(err, res) {
      if (err) throw err;
      let choiceArr = [];
      for (var i = 0; i < res.length; i++) {
        choiceArr.push(res[i]);
      };
      cb(choiceArr);
    });
  },
  addData: function(tableName, val) {
    let queryString = "INSERT INTO ?? SET ?"
    connection.query(queryString, [tableName, val], function(err, result) {
      if (err) throw err;
      console.log("Successfully added data!");
    });
  },
  viewAllEmployees: function(cb) {
    let queryString = 
    `SELECT e.first_name, e.last_name, title, salary, (name), 
    concat(m.first_name," ", m.last_name) as manager 
    FROM employee e
    left join employee m ON e.manager_id = m.id
    left JOIN emp_role ON e.role_id = emp_role.id
    left JOIN department ON emp_role.department_id = department.id`
    connection.query(queryString,function(err, result) {
      if (err) throw err;
      console.log(result);
      cb(result);
    });
  }
}
  


module.exports = orm;