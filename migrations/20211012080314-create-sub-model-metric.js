"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("sub_model_metrics", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      smp_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "sub_model_profiles",
          key: "id",
        },
      },
      metric_value: {
        type: Sequelize.FLOAT,
      },
      met_type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "metric_types",
          key: "id",
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("sub_model_metrics");
  },
};
