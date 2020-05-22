module.exports = (sequelize) => {
  const UserModel = sequelize.import("./db/auth/users.schema");
  const TicketsModel = sequelize.import("./db/tickets.schema");
  const RoleModel = sequelize.import("./db/auth/role.schema");
  const InvoiceItemTypeModel = sequelize.import("./db/invoice/invoiceItemType.schema");
  const InvoiceModel = sequelize.import("./db/invoice/invoice.schema");
  const InvoiceItemModel = sequelize.import("./db/invoice/invoiceItem.schema");

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
    InvoiceItemType:InvoiceItemTypeModel,
    Invoice : InvoiceModel,
    InvoiceItem:InvoiceItemModel
  };
};
