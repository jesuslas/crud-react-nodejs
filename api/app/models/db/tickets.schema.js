"use strict";
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define(
    "ticket",
    {
      ticket_pedido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      tableName: "tickets",
      timestamps: true,
    }
  );
  return user;
};
