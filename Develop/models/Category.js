const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // define columns
    id:{
      type: DataTypes.INTEGER, // Data type for the column
      allowNull: false, // Does not allow null values
      primaryKey: true, // Marks this column as the primary key
      autoIncrement: true, // Auto-increment the ID
    },
    category_name: {
      type: DataTypes.STRING, // Data type for the category name column
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false, // Disable timestamps
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
