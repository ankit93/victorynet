
function dbconnect(){
var mysql = require('mysql');
//database connection

var client = mysql.createConnection({
host: 'us-cdbr-east-06.cleardb.net',
user: 'b923e5879b2598',
password: 'c48c0cf4',
database:'heroku_5035f62fbd8a42c'
});

 return client;
}
exports.dbconnect = dbconnect;
