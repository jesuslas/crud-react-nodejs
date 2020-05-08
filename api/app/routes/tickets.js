const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();

module.exports = (models) => {
  const tickets = require("../modules/tickets.module")(models);

  router.use(bodyParser.json()); // for parsing application/json
  router.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

  router.get("/:id?", (a, b) => tickets.get(a, b));
  router.patch("/:id", (a, b) => tickets.edit(a, b));
  router.post("/", (a, b) => tickets.create(a, b));
  router.delete("/:id", (a, b) => tickets.delete(a, b));
  return router;
};
