"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("log_retrain_submit", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      mp_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "model_profiles",
          key: "id",
        },
      },
      response: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("log_retrain_submit");
  },
};
