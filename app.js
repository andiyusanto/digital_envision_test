var AppError = require('http-errors');
var express = require('express');
const helmet = require('helmet');

const {v4: uuidv4} = require('uuid');
const clientAddr = require('ipware')().get_ip;
const basicAuth = require('express-basic-auth')

const verifyMiddle = require('./middlewares/verify');

var indexRouter = require('./routes/index');
var usersAddRouter = require('./routes/users/users_add');
var usersDeleteRouter = require('./routes/users/users_delete');
var usersUpdateRouter = require('./routes/users/users_update');
var usersListRouter = require('./routes/users/users_list');
var timezonesListRouter = require('./routes/timezone/timezones_list');


var app = express();
const userAuth = process.env.AUTHUSER || 'admin';
const userPass = process.env.AUTHUSER || 'supersecretadmin';

app.set('json spaces', 0);
app.set('trust proxy', 'loopback');
app.use(helmet());
app.use(basicAuth({
  users: { userAuth: userPass }
}))

app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use(bearerToken());

// stampin middleware
app.use(async (req, res, next) => {
  const clientIP = clientAddr(req).clientIp || '';

  req.id = uuidv4();
  req.payload = {
    metadata: {},
    request: {},
    response: {},
  };
  req.payload.metadata.mid = req.id;
  req.payload.metadata.requestTimestamp = new Date().toLocaleString('id-ID');
  req.payload.metadata.invoke = req.path;
  req.payload.metadata.clientIp = clientIP;
  req.payload.request = req.body;

  next();
});

if (process.env.NODE_ENV == 'production') {
  app.use(verifyMiddle.allowedIP);
}
app.use(verifyMiddle.validContentType);

app.use('/', indexRouter);
app.use('/users', usersListRouter);
app.use('/users', usersAddRouter);
app.use('/users', usersDeleteRouter);
app.use('/users', usersUpdateRouter);
app.use('/timezone', timezonesListRouter);

app.use(async (req, res, next) => {
  req.payload.metadata.responseTimestamp = new Date().toLocaleString('id-ID');
  if (!req.payload.response.rc) {
    return next(new AppError.NotFound());
  }

  console.log(`${JSON.stringify(req.payload)}\n`);

  res.status(200).json(req.payload);
  // next();
});

// stampout, final output middleware
app.use(async (err, req, res, next) => {
  if (err) {
    req.payload.response.rc = err.status;
    req.payload.response.rd = err.message;
  }

  if (!req.payload.metadata) {
    req.payload.metadata.responseTimestamp = new Date().toLocaleString('id-ID');
  }

  console.log(`${JSON.stringify(req.payload)}\n`);
  // await app.get('db').logs.insert({
  //   app_id: (req.user && req.user.appId) ? req.user.appId :req.payload.metadata.clientIp,
  //   body: req.payload,
  //   mid: req.id,
  // }).catch((err) => {
  //   console.error('Failed Saving logs ', err);
  // });
  res.status(200).json(req.payload);
  // next();
});

module.exports = app;
