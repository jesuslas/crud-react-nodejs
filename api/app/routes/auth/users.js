const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();

module.exports = (models) => {
  const users = require("../../modules/auth/users.module")(models);

  router.use(bodyParser.json()); // for parsing application/json
  router.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

  router.get("/:id?", (a, b) => users.get(a, b));
  router.patch("/:id", (a, b) => users.edit(a, b));
  router.post("/", (a, b) => users.create(a, b));
  router.delete("/:id", (a, b) => users.delete(a, b));
  return router;
};
