var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('videos', { title: 'KNOCKOUT', message: '', path: 'videos'});
});

router.get('/fight', function(req, res, next) {
  res.render('fight', { title: 'KNOCKOUT', message: '', path: 'videos'});
});
module.exports = router;