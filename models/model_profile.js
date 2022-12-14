"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class model_profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      model_profile.hasMany(models.sub_model_profile, {
        foreignKey: "mp_id",
      });
      model_profile.belongsTo(models.section, {
        foreignKey: "section_id",
      });
      model_profile.hasMany(models.log_retrain_submit, {
        foreignKey: "mp_id",
      });
      model_profile.hasMany(models.dataset_detail, {
        foreignKey: "mp_id",
      });
    }
  }
  model_profile.init(
    {
      section_id: DataTypes.INTEGER,
      training_status: DataTypes.ENUM(
        "scheduled_for_training",
        "training",
        "trained",
        "in_use",
        "inactive",
        "failed"
      ),
      model_version: DataTypes.STRING,
      activated_on: DataTypes.DATE,
      trained_on: DataTypes.DATE,
      ds_version: DataTypes.STRING,
      created_at: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "model_profile",
      underscored: true,
      createdAt: "created_at",
      updatedAt: false,
    }
  );
  return model_profile;
};
