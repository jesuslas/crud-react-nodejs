const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();

module.exports = (models) => {
  const invoiceItem = require("../../modules/invoice/invoiceItem.module")(models);

  router.use(bodyParser.json()); // for parsing application/json
  router.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

  router.get("/:id?", (a, b) => invoiceItem.get(a, b));
  router.patch("/:id", (a, b) => invoiceItem.edit(a, b));
  router.post("/", (a, b) => invoiceItem.create(a, b));
  router.delete("/:id", (a, b) => invoiceItem.delete(a, b));
  return router;
};
