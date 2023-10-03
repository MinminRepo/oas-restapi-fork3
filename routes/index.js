var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get ('/favicon.ico', (req, res, next) => {
  res.status (204);
  res.end ();
})

module.exports = router;
