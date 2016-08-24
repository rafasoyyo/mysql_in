var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


router.get('/get_env', function(req, res) {
  res.json(process.env);
});

module.exports = router;
