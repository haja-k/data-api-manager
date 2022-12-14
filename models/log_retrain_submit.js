"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class log_retrain_submit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      log_retrain_submit.belongsTo(models.model_profile, {
        foreignKey: "mp_id",
      });
    }
  }
  log_retrain_submit.init(
    {
      mp_id: DataTypes.INTEGER,
      response: DataTypes.TEXT,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "log_retrain_submit",
      tableName: "log_retrain_submit",
      underscored: true,
      createdAt: "created_at",
      updatedAt: false,
    }
  );
  return log_retrain_submit;
};
