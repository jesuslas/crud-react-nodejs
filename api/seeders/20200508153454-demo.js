'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('role', [
        {
        name: 'admin',
        },
        {
          name: 'user',
        }
    ], {});
      await queryInterface.bulkInsert('users', [
        {
          name: "admin",
          roleId: 1,
          email: "co@co.com",
          password: "1234",
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
          name: "user",
          roleId: 2,
          email: "co@co2.com",
          password: "1234",
          createdAt:new Date(),
          updatedAt:new Date()
        }
    ], {});
     return await queryInterface.bulkInsert('tickets', [
      {
        ticket_pedido: "ticket admin",
        userId:1,
        status:"Created",
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        ticket_pedido: "ticket user",
        userId:2,
        status:"Created",
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        ticket_pedido: "ticket user",
        status:"Created",
        userId:1,
        createdAt:new Date(),
        updatedAt:new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
   
  }
};
