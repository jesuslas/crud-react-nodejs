"use strict";
module.exports = (sequelize, DataTypes) => {
 return sequelize.define(
    "invoice",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalAmount:{
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      taxes:{
        type: DataTypes.DECIMAL,
        allowNull: true,
      }
    },
    {
      tableName: "invoice",
      timestamps: true,
    }
  );
};
