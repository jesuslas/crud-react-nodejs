const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();

module.exports = (models) => {
  const role = require("../modules/role.module")(models);

  router.use(bodyParser.json()); // for parsing application/json
  router.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

  router.get("/:id?", (a, b) => role.get(a, b));
  router.patch("/:id", (a, b) => role.edit(a, b));
  router.post("/", (a, b) => role.create(a, b));
  router.delete("/:id", (a, b) => role.delete(a, b));
  return router;
};
