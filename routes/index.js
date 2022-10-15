var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.payload.response.rc = '00';
  req.payload.response.rd = 'SUCCESS';  
  req.payload.response.data = 'DIGITAL ENVISION TEST';

  next();
});

module.exports = router;
