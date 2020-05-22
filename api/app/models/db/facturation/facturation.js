"use strict";
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "facturation",
    {
      invoiceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          table: "invoice",
          field: "id"
        }
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          table: "user",
          field: "id"
        }
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
    },
    {
      timestamps: true,
      tableName: "facturation"
    }
  );
};
