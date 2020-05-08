'use strict';

module.exports = {
  up: async function(queryInterface, Sequelize) {
    await queryInterface.addColumn("tickets", "createdAt", {
      allowNull: false,
      type: Sequelize.DATE
    });
    return await queryInterface.addColumn("tickets", "updatedAt", {
      allowNull: false,
      type: Sequelize.DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.removeColumn("tickets", "updatedAt");
    return await queryInterface.removeColumn("tickets", "createdAt");
  }
};
