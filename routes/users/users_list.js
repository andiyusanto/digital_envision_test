var express = require('express');
var router = express.Router();
const userModel = require('../../models/users');
const respConstant = require('../../libs/constant');

/* GET users listing. */
router.get(['/','/:offset/:limit'], async function(req, res, next) {
  req.payload.response.rc = respConstant.responseCode.rcSuccess;
  req.payload.response.rd = respConstant.responseDesc.rdSuccess;
  let offset = req.params.offset || 0;
  let limit = req.params.limit || 10;

  const db = req.app.get('db');
  const users = await userModel.getUsers(db);
  
  const datausers = await users.findAll({
    'attributes': ['id', 'last_name','first_name','birthday_date','location'],
    'order': [
      ['id', 'ASC'],
    ],
    'offset': offset, 'limit': limit 
  });
  const totalData = await users.count();

  req.payload.response.data = {
    'list' : datausers,
    'total': totalData
  }

  next();
});

module.exports = router;
