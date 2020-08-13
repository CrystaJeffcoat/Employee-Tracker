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
  updateData: function(tableName, val1, val2) {
    let queryString = "UPDATE ?? SET ? WHERE ?"
    connection.query(queryString, [tableName, val1, val2], function(err, result) {
      if (err) throw err;
      console.log("Successfully updated data!");
    });
  },
  delete: function(tableName, val) {
    let queryString = "DELETE FROM ?? WHERE ?"
    connection.query(queryString, [tableName, val], function(err, result) {
      if (err) {
        console.log("Oops! This data cannot be deleted without addressing its associated data. \n" + err);
        return;
      }
      console.log("Data deleted!");
    });
  }
}

module.exports = orm;