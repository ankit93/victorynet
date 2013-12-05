
function dbconnect(){
var mysql = require('mysql');
//database connection

var client = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'vnt',
database:'victoryNet'
});

 return client;
}
exports.dbconnect = dbconnect;