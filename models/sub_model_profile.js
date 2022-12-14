"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sub_model_profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      sub_model_profile.belongsTo(models.model_profile, {
        foreignKey: "mp_id",
      });
      sub_model_profile.belongsTo(models.sub_model_type, {
        foreignKey: "sm_type_id",
      });
      sub_model_profile.hasMany(models.sub_model_metric, {
        foreignKey: "smp_id",
      });
      sub_model_profile.hasMany(models.model_hyperparameter, {
        foreignKey: "smp_id",
      });
      sub_model_profile.hasMany(models.model_feature_list, {
        foreignKey: "smp_id",
      });
    }
  }
  sub_model_profile.init(
    {
      mp_id: DataTypes.INTEGER,
      sm_type_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "sub_model_profile",
      createdAt: false,
      updatedAt: false,
    }
  );
  return sub_model_profile;
};
