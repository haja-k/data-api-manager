"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class model_hyperparameter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      model_hyperparameter.belongsTo(models.sub_model_profile, {
        foreignKey: "smp_id",
      });
    }
  }
  model_hyperparameter.init(
    {
      smp_id: DataTypes.INTEGER,
      hyperparameter_value: DataTypes.FLOAT,
      m_hyper_type: DataTypes.ENUM(
        "learning_rate",
        "depth",
        "l2_leaf_reg",
        "random_strength",
        "iterations",
        "model_shrink_rate",
        "diffusion_temperature"
      ),
    },
    {
      sequelize,
      modelName: "model_hyperparameter",
      underscored: true,
      createdAt: false,
      updatedAt: false,
    }
  );
  return model_hyperparameter;
};
