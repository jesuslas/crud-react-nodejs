"use strict";
module.exports = (sequelize, DataTypes) => {
  const getLastId = async () =>{
    return await sequelize.models.invoiceItemType.findAll({
      limit: 1,
      order: [ [ 'id', 'DESC' ]],
      raw: true,
    })
  }
  return sequelize.define(
    "invoiceItemType",
    {
      number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        default:""
      },
    },
    {
      tableName: "invoiceItemType",
      timestamps: false,
      hooks: {
        beforeCreate: async (itemType,option) => {
          console.log('itemType',itemType.dataValues);
          console.log('option',option);
          const [lastItem] = await getLastId();
          console.log('lastItem',lastItem.id);
           itemType.number = itemType.id + 1;
        },
    }
    }
  );
};
