"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("model_hyperparameters", {
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
      hyperparameter_value: {
        type: Sequelize.FLOAT,
      },
      m_hyper_type: {
        type: Sequelize.ENUM(
          "learning_rate",
          "depth",
          "l2_leaf_reg",
          "random_strength",
          "iterations",
          "model_shrink_rate",
          "diffusion_temperature"
        ),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("model_hyperparameters");
  },
};
