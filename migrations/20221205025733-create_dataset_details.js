"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("dataset_details", {
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
      case_list: {
        type: Sequelize.TEXT,
      },
      start_date: {
        type: Sequelize.DATE,
      },
      end_date: {
        type: Sequelize.DATE,
      },
      total_cases: {
        type: Sequelize.INTEGER,
      },
      total_case_fine: {
        type: Sequelize.INTEGER,
      },
      total_case_imprisonment: {
        type: Sequelize.INTEGER,
      },
      total_case_bond: {
        type: Sequelize.INTEGER,
      },
      total_case_whipping: {
        type: Sequelize.INTEGER,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('dataset_details');
  },
};
