var express = require('express');
var router = express.Router();
const moment = require('moment');
const userModel = require('../../models/users');
const utils = require('../../libs/utils');
const respConstant = require('../../libs/constant');

/* update users. */
router.put('/:userId', async function(req, res, next) {
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
  const validUserId = utils.validateNumberOnly(req.params.userId);
  if(validUserId == true && validFN == true && validLN == true && validBD == true && validLoc == true){
    const db = req.app.get('db');
    const users = await userModel.getUsers(db);
    let isExist = await users.findByPk(req.params.userId);
    if(isExist){
      const dataToUpdate = {
        first_name: first_name,
        last_name : last_name,
        birthday_date : moment(birthday_date,'YYYY-MM-DD'),
        location : location
      }
      
      const dataUpdated = await users.update(dataToUpdate, {
        where: {
          id: req.params.userId
        }
      });
      isExist = await users.findByPk(req.params.userId);
      req.payload.response.data = isExist;
    }else{
      req.payload.response.rc = respConstant.responseCode.rcNotFound
      req.payload.response.rd = respConstant.responseDesc.rdNotFound;  
    }
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
    }else if(!validUserId){
      req.payload.response.rd = respConstant.responseDesc.rdNotValidUserId;
    }
  } 
 

  next();
  // res.send('respond with a resource');
});

module.exports = router;
