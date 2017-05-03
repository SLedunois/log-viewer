var router = require('express').Router();

router.get('/', function (req, res, next) {
  res.sendfile('../public/index.html');
});

module.exports = router;