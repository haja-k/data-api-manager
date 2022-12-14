"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class section extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      section.hasMany(models.model_profile, {
        foreignKey: "section_id",
      });
      section.hasMany(models.feature_list, {
        foreignKey: "section_id",
      });
    }
  }
  section.init(
    {
      section_name: DataTypes.STRING,
      created_at: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "section",
      createdAt: "created_at",
      updatedAt: false,
    }
  );
  return section;
};
