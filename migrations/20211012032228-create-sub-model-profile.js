"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("sub_model_profiles", {
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
      sm_type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "sub_model_types",
          key: "id",
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("sub_model_profiles");
  },
};
