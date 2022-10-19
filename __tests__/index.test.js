// const app = require("../bin/www"); // Link to your server file
const app = require('../app');
const supertest = require("supertest");
const request = supertest(app);

describe("Home test", () => {
  test("GET 200 /", (done) => {
    // Logic goes here
    request.get("/")
    .set('Authorization', 'Basic YWRtaW46c3VwZXJzZWNyZXRhZG1pbg==')
    .set('Content-Type',  'application/json')
    .send({})
    .expect(200)
    .expect((res) => {
      console.log(res.status);
      res.status = 200;
      res.body.response.rc = '00';
      res.body.response.rd = 'SUCCESS';
    })
    .end((err, res) => {
      if (err) return done(err);
      return done();
    });
  });

  test("GET 401 /", (done) => {
    // Logic goes here
    request.get("/")
    // .set('Authorization', 'Basic YWRtaW46c3VwZXJzZWNyZXRhZG1pbg==')
    .set('Content-Type',  'application/json')
    .send({})
    .expect(401)
    .expect((res) => {
      console.log(res.status);
      // res.status = 401;
    })
    .end((err, res) => {
      if (err) return done(err);
      return done();
    });
  });

  test("GET 400 /", (done) => {
    // Logic goes here
    request.get("/")
    .set('Authorization', 'Basic YWRtaW46c3VwZXJzZWNyZXRhZG1pbg==')
    // .set('Content-Type',  'application/json')
    // .send({})
    .expect(200)
    .expect((res) => {
      console.log(res.status);
      // res.status = 200;
      res.body.response.rc = 401;
    })
    .end((err, res) => {
      if (err) return done(err);
      return done();
    });
  });
});
