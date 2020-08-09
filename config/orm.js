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
      console.log(result);
    });
  },
}
  


module.exports = orm;