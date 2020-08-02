const connection = require("./connection");

const orm = {
  addData: function(tableName, val) {
    let queryString = "INSERT INTO ?? SET ?"
    connection.query(queryString, [tableName, val], function(err, result) {
      if (err) throw err;
      console.log(result);
    });
  },
}
  


module.exports = orm;