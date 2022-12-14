"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class model_feature_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      model_feature_list.belongsTo(models.sub_model_profile, {
        foreignKey: "smp_id",
      });
    }
  }
  model_feature_list.init(
    {
      smp_id: DataTypes.INTEGER,
      feature_name: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: "model_feature_list",
      createdAt: false,
      updatedAt: false,
    }
  );
  return model_feature_list;
};