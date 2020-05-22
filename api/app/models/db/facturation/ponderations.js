"use strict";
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "ponderations",
    {
      number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      tableName: "ponderations",
      timestamps: false,
    }
  );
};
