var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('howitworks', { title: 'KNOCKOUT', message: '', path: 'how it works'});
});

module.exports = router;