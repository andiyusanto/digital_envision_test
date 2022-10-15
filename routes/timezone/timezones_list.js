var express = require('express');
var router = express.Router();
const ct = require('countries-and-timezones');

/* GET timzone listing. */
router.get(['/','/:timezoneId'], function(req, res, next) {
  req.payload.response.rc = respConstant.responseCode.rcSuccess;
  req.payload.response.rd = respConstant.responseDesc.rdSuccess;
  let timezoneId = req.params.timezoneId;
  // const countries = ct.getAllTimezones();
  const countries = ct.getAllCountries();
  let defineId = false;
  if( timezoneId != null && timezoneId != ''){
    defineId = true;
    timezoneId = timezoneId.toString().toUpperCase();
  }
  req.payload.response.data = ((defineId == true) ? countries[timezoneId] : countries);

  next();
});

module.exports = router;
