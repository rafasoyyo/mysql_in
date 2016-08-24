var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

var Mysql      = require('mysql');
var connection;

(function(){

	var sql = process.env.MYSQLCONNSTR_localdb || "Database=azuredb;Data Source=127.0.0.1:50663;User Id=azure;Password=password"
	var s = sql.split(';')
	var mysql = {}
	for(var i = 0, il = s.length; i<il; i++){
		r = s[i].split('=')
		key = (r[0]).replace(' ', '_');
		if(key === 'Data_Source'){
			mysql.Port = (r[1].split(':'))[1];
			mysql.Host = (r[1].split(':'))[0];
		}
		else{
			mysql[key]=r[1]
		}
	}
	console.log(mysql);
	connection = Mysql.createConnection({
  		host     : mysql.Host,
  		port 	 : mysql.Port,
		user     : mysql.User_Id,
		password : mysql.Password,
		database : mysql.Database,
	});


})()

router.get('/get_env', function(req, res) {
	connection.connect(function(connect_err) {
    	connection.query('SELECT * FROM user;', function(query_err, users, fields){
	  		res.json({"MYSQLCONNSTR_localdb": process.env.MYSQLCONNSTR_localdb, "env": process.env, "connect_con": connection.threadId, "connect_err":connect_err, "query_err": query_err, "query_con": fields});
	  	});
	});
});

module.exports = router;
