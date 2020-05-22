"use strict";
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define(
    "role",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "role",
      timestamps: false,
    }
  );
  return user;
};
