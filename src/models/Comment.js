const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define(
    'Comment',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
      },
      imageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'image_id',
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      tableName: 'comments',
      timestamps: false,
    }
  );
