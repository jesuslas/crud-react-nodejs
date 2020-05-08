const { ok, fail, accepted } = require("../commons/responses");

class Users {
  models = null;
  constructor(models) {
    this.models = models;
  }

  async get(req, res) {
    try {
      const { id } = req.params;
      const { Users } = this.models;
      const users = await Users.findAll({ ...(id && { where: { id } }) });
      ok(res)(users);
    } catch (error) {
      fail(res)(error);
    }
  }
  async edit(req, res) {
    try {
      const { id } = req.params;
      const { ...update } = req.body;
      const { Users } = this.models;
      const [, [data]] = await Users.update(
        { ...update },
        { where: { id }, individualHooks: true }
      );
      ok(res)(data);
    } catch (error) {
      fail(res)(error);
    }
  }
  async create(req, res) {
    try {
      const { ...body } = req.body;
      const { Users } = this.models;
      const data = await Users.create(body);
      ok(res)(data);
    } catch (error) {
      fail(res)(error);
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      const { Users } = this.models;
      await Users.destroy({
        where: { id },
        individualHooks: true,
      });
      accepted(res)();
    } catch (error) {
      fail(res)(error);
    }
  }
}

module.exports = (models) => new Users(models);
