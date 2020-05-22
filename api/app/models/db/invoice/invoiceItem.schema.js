"use strict";
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "invoiceItem",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      invoiceItemTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          table: "invoiceItemType",
          field: "id"
        }
      },
      invoiceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          table: "invoice",
          field: "id"
        }
      }
    },
    {
      tableName: "invoiceItem",
      timestamps: true,
    }
  );
};
