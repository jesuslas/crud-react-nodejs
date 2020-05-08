module.exports = (sequelize) => {
  const UserModel = sequelize.import("./db/users.schema");
  const TicketsModel = sequelize.import("./db/tickets.schema");
  const RoleModel = sequelize.import("./db/role.schema");

  UserModel.hasOne(TicketsModel, {
    foreignKey: "userId",
    otherKey: "id",
    as: "user",
  });

  TicketsModel.belongsTo(UserModel, {
    foreignKey: "userId",
    otherKey: "id",
    as: "user",
  });

  RoleModel.hasOne(UserModel, {
    foreignKey: "roleId",
    otherKey: "id",
    as: "user_types",
  });

  UserModel.belongsTo(RoleModel, {
    foreignKey: "roleId",
    otherKey: "id",
    as: "user_types",
  });
  return {
    Role: RoleModel,
    Users: UserModel,
    Tickets: TicketsModel,
  };
};
