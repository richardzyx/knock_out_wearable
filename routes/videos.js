var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('videos', { title: 'KNOCKOUT', message: '', path: 'videos'});
});

router.get('/alivsfrazier', function(req, res, next) {
  res.render('alivsfrazier', { title: 'KNOCKOUT', message: '', path: 'videos'});
});
module.exports = router;