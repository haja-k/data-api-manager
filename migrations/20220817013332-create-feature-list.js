'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('feature_lists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      feature_name: {
        type: Sequelize.TEXT
      },
      section_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "sections",
          key: "id",
        },
      },
      isValid: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      feature_type:{
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('feature_lists');
  }
};