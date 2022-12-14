"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class dataset_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      dataset_detail.belongsTo(models.model_profile, {
        foreignKey: "mp_id", 
      });
    }
  }
  dataset_detail.init(
    {
      mp_id: DataTypes.INTEGER,
      case_list: DataTypes.TEXT,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      total_cases: DataTypes.INTEGER,
      total_case_fine: DataTypes.INTEGER,
      total_case_imprisonment: DataTypes.INTEGER,
      total_case_bond: DataTypes.INTEGER,
      total_case_whipping: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "dataset_detail",
      createdAt: false,
      updatedAt: false,
    }
  );
  return dataset_detail;
};