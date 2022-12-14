"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sub_model_metric extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      sub_model_metric.belongsTo(models.sub_model_profile, {
        foreignKey: "smp_id",
      });
      sub_model_metric.belongsTo(models.metric_type, {
        foreignKey: "met_type_id",
      });
    }
  }
  sub_model_metric.init(
    {
      smp_id: DataTypes.INTEGER,
      metric_value: DataTypes.FLOAT,
      met_type_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "sub_model_metric",
      createdAt: false,
      updatedAt: false,
    }
  );
  return sub_model_metric;
};
