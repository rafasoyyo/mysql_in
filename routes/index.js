var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

var Mysql      = require('mysql');
var connection;

(function(){

	var sql = "Database=azuredb;Data Source=127.0.0.1:50663;User Id=azure;Password=password"
	var s = sql.split(';')
	var mysql = {}
	for(var i = 0, il = s.length; i<il; i++){
		r = s[i].split('=')
		key = (r[0]).replace(' ', '_');
		mysql[key]=r[1]
	}
	console.log(mysql);
	connection = Mysql.createConnection({
  		host     : mysql.Data_Source,
		user     : mysql.User_Id,
		password : mysql.Password,
		database : mysql.azuredb
	});


})()

router.get('/get_env', function(req, res) {
	connection.connect(function(err) {
  		// if (err) {
    // 		console.error('error connecting: ' + err.stack);
    // 		return;
  		// }
  		// console.log('connected as id ' + connection.threadId);
  		res.json({env: process.env, mysql: connection, mysql_err:err});
	});
});

module.exports = router;
