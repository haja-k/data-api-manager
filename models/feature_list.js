'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class feature_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      feature_list.hasMany(models.model_feature_list, {
        foreignKey: "feature_id",
      });
    }
  };
  feature_list.init({
    feature_name: DataTypes.STRING,
    section_id: DataTypes.INTEGER,
    feature_type: DataTypes.STRING,
    isValid: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'feature_list',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
  return feature_list;
};