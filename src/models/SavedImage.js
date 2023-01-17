const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define(
    'SavedImage',
    {
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
      savedDate: {
        type: DataTypes.DATE,
        field: 'saved_date',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      tableName: 'saved_images',
      timestamps: false,
    }
  );
