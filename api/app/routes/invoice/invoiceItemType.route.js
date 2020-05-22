const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();

module.exports = (models) => {
  const invoiceItemType = require("../../modules/invoice/invoiceItemType.module")(models);

  router.use(bodyParser.json()); // for parsing application/json
  router.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

  router.get("/:id?", (a, b) => invoiceItemType.get(a, b));
  router.patch("/:id", (a, b) => invoiceItemType.edit(a, b));
  router.post("/", (a, b) => invoiceItemType.create(a, b));
  router.delete("/:id", (a, b) => invoiceItemType.delete(a, b));
  return router;
};
