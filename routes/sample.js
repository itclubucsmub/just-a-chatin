var express = require('express');
var router = express.Router();
const sqlite3 = require("sqlite3").verbose()

router.get('/', function (req, res) {

  let db = new sqlite3.Database('./database/botapp.db');

  let sql = `SELECT * FROM people`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    return res.json(rows);
  });

  db.close()

});

module.exports = router;
