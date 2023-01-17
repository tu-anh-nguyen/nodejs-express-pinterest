require('colors');
const { Sequelize } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(
  config.dbname,
  config.username,
  config.password,
  {
    dialect: 'mysql',
    host: config.host,
    port: config.port,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Sequelize Connected'.green);
  } catch (error) {
    console.log('Sequelize Error'.red, error);
  }
})();

const User = require('./User')(sequelize);
const Image = require('./Image')(sequelize);
const SavedImage = require('./SavedImage')(sequelize);
const Comment = require('./Comment')(sequelize);

// user - images
Image.belongsTo(User, { foreignKey: 'userId', as: 'createdBy' });
User.hasMany(Image, { foreignKey: 'userId', as: 'images' });

// user - Image through saved-images
User.belongsToMany(Image, {
  as: 'savedImages',
  through: SavedImage,
  foreignKey: 'userId',
});
Image.belongsToMany(User, {
  as: 'userSaved',
  through: SavedImage,
  foreignKey: 'imageId',
});

// user - Image through comment
User.belongsToMany(Image, {
  as: 'comments',
  through: Comment,
  foreignKey: 'userId',
});
Image.belongsToMany(User, {
  as: 'comments',
  through: Comment,
  foreignKey: 'imageId',
});

module.exports = {
  User,
  Image,
  SavedImage,
  Comment,
  sequelize,
};
