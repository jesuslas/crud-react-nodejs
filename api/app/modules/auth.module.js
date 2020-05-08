const { env } = require("../commons/env");
const { ok, fail } = require("../commons/responses");

class Auth {
  models = null;
  constructor(models) {
    this.models = models;
  }

  login(req, res) {
    const { username, passoword } = req.body;
  }
}

module.exports = (models) => new Auth(models);
