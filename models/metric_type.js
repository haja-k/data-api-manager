"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class metric_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      metric_type.hasMany(models.sub_model_metric, {
        foreignKey: "met_type_id",
      });
    }
  }
  metric_type.init(
    {
      metric_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "metric_type",
      createdAt: false,
      updatedAt: false,
    }
  );
  return metric_type;
};
