const { ok, fail, accepted } = require("../../commons/responses");
const SQLRoute = require("../sequelize/SQLRoute");

class Invoice extends SQLRoute {
  models = null;
  constructor(models) {
    super(models,"Invoice");
    this.models = models;
  }
}

module.exports = (models) => new Invoice(models);
