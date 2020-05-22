const { ok, fail, accepted } = require("../commons/responses");
const SQLRoute = require("./sequelize/SQLRoute");

class Tickets extends SQLRoute {
  models = null;
  constructor(models) {
    super(models,"Tickets");
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
  
}

module.exports = (models) => new Tickets(models);
