"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sub_model_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      sub_model_type.hasMany(models.sub_model_profile, {
        foreignKey: "sm_type_id",
      });
    }
  }
  sub_model_type.init(
    {
      model_type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "sub_model_type",
      createdAt: false,
      updatedAt: false,
    }
  );
  return sub_model_type;
};
