const { ok, fail, accepted } = require("../commons/responses");

class Tickets {
  models = null;
  constructor(models) {
    this.models = models;
  }

  async get(req, res) {
    try {
      const { id } = req.params;
      const { userId } = req.query;
      const { Tickets, Users } = this.models;
      const Ticket = await Tickets.findAll({
        ...(id && { where: { id } }),
        ...(userId && { where: { userId } }),
        include: [
          {
            model: Users,
            as: "user",
          },
        ],
      });
      ok(res)(Ticket);
    } catch (error) {
      fail(res)(error);
    }
  }
  async edit(req, res) {
    try {
      const { id } = req.params;
      const { body } = req.body;
      const { Tickets } = this.models;
      const [, [data]] = await Tickets.update(
        { ...body },
        { where: { id }, individualHooks: true }
      );
      ok(res)(data);
    } catch (error) {
      fail(res)(error);
    }
  }
  async create(req, res) {
    try {
      const { body } = req.body;
      console.log("body", body);
      const { Tickets } = this.models;
      const data = await Tickets.create(body);
      ok(res)(data);
    } catch (error) {
      fail(res)(error);
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      const { Tickets } = this.models;
      await Tickets.destroy({
        where: { id },
        individualHooks: true,
      });
      accepted(res)();
    } catch (error) {
      fail(res)(error);
    }
  }
}

module.exports = (models) => new Tickets(models);
