'use strict';

module.exports = {
  up: async function(queryInterface, Sequelize) {
    return await queryInterface.addColumn("tickets", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id"
      },
      onDelete: "cascade"
    });
   
  },

  down: async (queryInterface, Sequelize) => {
     return await queryInterface.removeColumn("tickets", "userId");
  }
};
