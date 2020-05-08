const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();
const apiRouter = express.Router();

module.exports = (models) => {
  router.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    // Request headers you wish to allow
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", false);
    // Pass to next layer of middleware
    next();
  });

  apiRouter.use(bodyParser.json()); // for parsing application/json
  apiRouter.use(
    bodyParser.urlencoded({
      extended: false,
    })
  ); // for parsing application/x-www-form-urlencoded

  apiRouter.use("/auth", require("./auth")(models));
  apiRouter.use("/users", require("./users")(models));
  apiRouter.use("/tickets", require("./tickets")(models));

  /* GET home page. */
  router.get("/", function (req, res, next) {
    res.status(200).send({
      msg: "Servidor api-landing",
    });
  });

  // apiRouter.use('/users', require('./users'))
  router.use("/api", apiRouter);
  return router;
};
