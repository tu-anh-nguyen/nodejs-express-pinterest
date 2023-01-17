module.exports = (_componentName, modelName, tableName) => {
  return {
    content: `
const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define(
    '${modelName}',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
    },
    {
      tableName: '${tableName}s',
      timestamps: false,
    }
  );    
`,
    name: `${modelName}.js`,
  };
};
