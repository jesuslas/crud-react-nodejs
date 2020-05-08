const { ok, fail, accepted } = require("../commons/responses");

class Role {
  models = null;
  constructor(models) {
    this.models = models;
  }

  async get(req, res) {
    try {
      const { id } = req.params;
      const { Role } = this.models;
      const role = await Role.findAll({ ...(id && { where: { id } }) });
      ok(res)(role);
    } catch (error) {
      fail(res)(error);
    }
  }
  async edit(req, res) {
    try {
      const { id } = req.params;
      const { ...update } = req.body;
      const { Role } = this.models;
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
      const { Role } = this.models;
      const data = await Role.create(body);
      ok(res)(data);
    } catch (error) {
      fail(res)(error);
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      const { Role } = this.models;
      await Role.destroy({
        where: { id },
        individualHooks: true,
      });
      accepted(res)();
    } catch (error) {
      fail(res)(error);
    }
  }
}

module.exports = (models) => new Role(models);
