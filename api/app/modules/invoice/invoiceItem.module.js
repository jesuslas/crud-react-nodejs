const { ok, fail, accepted } = require("../../commons/responses");
const SQLRoute = require("../sequelize/SQLRoute");

class InvoiceItem extends SQLRoute {
  models = null;
  constructor(models) {
    super(models,"InvoiceItem");
    this.models = models;
  }
}

module.exports = (models) => new InvoiceItem(models);
