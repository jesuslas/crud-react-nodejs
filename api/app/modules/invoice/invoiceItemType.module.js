const { ok, fail, accepted } = require("../../commons/responses");
const SQLRoute = require("../sequelize/SQLRoute");

class InvoiceItemType extends SQLRoute {
  models = null;
  constructor(models) {
    super(models,"InvoiceItemType");
    this.models = models;
  }
}

module.exports = (models) => new InvoiceItemType(models);
