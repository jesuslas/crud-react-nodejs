const { ok, fail, notFound } = require("../commons/responses");

class Auth {
  models = null;
  constructor(models) {
    this.models = models;
  }

  async login(req, res) {
    const { user: name, password, ...rest } = req.body.body;
    try {
      console.log('name, password',name, password);
      const { Users,Role } = this.models;
      const users = await Users.findOne({
        where: { name, password },
        include: [
          {
            model: Role,
            as: "user_types",
          },
        ]
      });
      if (!users) {
        return notFound(res)("Unable to find user");
      }
      ok(res)(users);
    } catch (error) {
      fail(res)(error);
    }
  }
}

module.exports = (models) => new Auth(models);
