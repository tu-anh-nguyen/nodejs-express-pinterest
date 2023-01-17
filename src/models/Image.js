const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define(
    'Image',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
      },
    },
    {
      tableName: 'images',
      timestamps: false,
    }
  );
