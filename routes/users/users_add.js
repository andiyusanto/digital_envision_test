var express = require('express');
var router = express.Router();
const moment = require('moment');
const userModel = require('../../models/users');
const utils = require('../../libs/utils');
const respConstant = require('../../libs/constant');

/* add users. */
router.post('/', async function(req, res, next) {
  req.payload.response.rc = respConstant.responseCode.rcSuccess;
  req.payload.response.rd = respConstant.responseDesc.rdSuccess;
  const first_name = req.body.first_name
	const last_name = req.body.last_name
	const birthday_date = req.body.birthday_date
	const location = req.body.location
  const validFN = utils.validateStringOnly(first_name);
  const validLN = utils.validateStringOnly(last_name);
  const validBD = utils.validateDate(birthday_date);
  const validLoc = utils.validateTimezone(location);

  if(validFN == true && validLN == true && validBD == true && validLoc == true){
    const dataToInsert = {
      first_name: first_name,
      last_name : last_name,
      birthday_date : moment(birthday_date,'YYYY-MM-DD'),
      location : location
    }
    const db = req.app.get('db');
    const users = await userModel.getUsers(db);
    const dataInserted = await users.create(dataToInsert); 
    req.payload.response.data = dataInserted.dataValues;
  }else{
    req.payload.response.rc = respConstant.responseCode.rcNotValid;
    if(!validFN){
      req.payload.response.rd = respConstant.responseDesc.rdNotValidFN;  
    }else if(!validLN){
      req.payload.response.rd = respConstant.responseDesc.rdNotValidLN;  
    }else if(!validBD){
      req.payload.response.rd = respConstant.responseDesc.rdNotValidBD;  
    }else if(!validLoc){
      req.payload.response.rd = respConstant.responseDesc.rdNotValidLoc;  
    }
  }  
  next();
});

module.exports = router;
