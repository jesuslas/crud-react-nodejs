module.exports = (sequelize) => {
  const UserModel = sequelize.import("./db/users.schema");
  const TicketsModel = sequelize.import("./db/tickets.schema");

  return {
    Users: UserModel,
    Tickets: TicketsModel,
  };
};
