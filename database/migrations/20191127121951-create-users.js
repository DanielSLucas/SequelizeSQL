'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', { 
      
      id: {  //Coluna ID
        allowNull: false, //não nula
        autoIncrement: true, //autoincremental
        primaryKey: true, // É uma PK
        type: Sequelize.INTEGER //é uma string
      },
      
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

    });   
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.dropTable('users');
    
  }
};
