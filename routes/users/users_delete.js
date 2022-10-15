var express = require('express');
var router = express.Router();
const userModel = require('../../models/users');
const utils = require('../../libs/utils');
const respConstant = require('../../libs/constant');

/* delete users. */
router.delete('/:userId', async function(req, res, next) {
  req.payload.response.rc = respConstant.responseCode.rcSuccess;
  req.payload.response.rd = respConstant.responseDesc.rdSuccess;
  
  const validUserId = utils.validateNumberOnly(req.params.userId);

  if(validUserId == true ){
    const db = req.app.get('db');
    const users = await userModel.getUsers(db);
    const isExist = await users.findByPk(req.params.userId);
    if(isExist){
      req.payload.response.data = isExist;
      await users.destroy({
        where: {
          id: req.params.userId
        }
      });
    }else{
      req.payload.response.rc = respConstant.responseCode.rcNotFound
      req.payload.response.rd = respConstant.responseDesc.rdNotFound;  
    }
  }else{
    req.payload.response.rc = respConstant.responseCode.rcNotValid;
    req.payload.response.rd = respConstant.responseDesc.rdNotValidUserId;
  }  

  next();
});

module.exports = router;
