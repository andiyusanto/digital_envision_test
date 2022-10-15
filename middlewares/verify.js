/* eslint require-jsdoc: [0] */
const AppError = require('http-errors');
// const jwt = require('jsonwebtoken');
// const Utils = require('../libs/utils');

async function allowedIP(req, res, next) {
  const clientIP = req.payload.metadata.clientIp;
  if (!clientIP || clientIP == '') {
    return next(new AppError.Forbidden('Invalid Host'));
  }
  
  // local ip
  if (clientIP == '127.0.0.1' || clientIP == '::ffff:127.0.0.1' ) {
    return next();
  }
  
  return next(new AppError.Forbidden('Invalid Host'));
}

async function validContentType(req, res, next) {
  if (!req.is('application/json')) {
    return next(new AppError.BadRequest('Invalid Content type'));
  }
  next();
}

module.exports = {
  allowedIP: allowedIP,
  validContentType: validContentType,
};
