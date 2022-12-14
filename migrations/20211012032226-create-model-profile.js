"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("model_profiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      section_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "sections",
          key: "id",
        },
      },
      training_status: {
        type: Sequelize.ENUM(
          "scheduled_for_training",
          "training",
          "trained",
          "in_use",
          "inactive",
          "failed"
        ),
      },
      model_version: {
        type: Sequelize.STRING,
      },
      activated_on: {
        type: Sequelize.DATE,
      },
      trained_on: {
        type: Sequelize.DATE,
      },
      ds_version: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("model_profiles");
  },
};
