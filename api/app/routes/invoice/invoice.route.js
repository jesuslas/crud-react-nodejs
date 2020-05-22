const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();

module.exports = (models) => {
  const invoice = require("../../modules/invoice/invoice.module")(models);

  router.use(bodyParser.json()); // for parsing application/json
  router.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

  router.get("/:id?", (a, b) => invoice.get(a, b));
  router.patch("/:id", (a, b) => invoice.edit(a, b));
  router.post("/", (a, b) => invoice.create(a, b));
  router.delete("/:id", (a, b) => invoice.delete(a, b));
  return router;
};
