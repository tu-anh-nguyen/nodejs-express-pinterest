const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const UserRolesEnums = require('../enums/userRoles');

module.exports = (sequelize) =>
  sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      fullName: {
        type: DataTypes.STRING(255),
        field: 'full_name',
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING(255),
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Invalid email',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          const salt = bcrypt.genSaltSync();
          const hashedPassword = bcrypt.hashSync(value, salt);
          this.setDataValue('password', hashedPassword);
        },
      },
      roles: {
        type: DataTypes.ENUM(Object.values(UserRolesEnums)),
        defaultValue: UserRolesEnums.USER,
        allowNull: false,
      },
    },
    {
      tableName: 'users',
      timestamps: false,
      defaultScope: {
        attributes: {
          exclude: 'password',
        },
      },
      hooks: {
        afterSave: (record) => {
          delete record.dataValues.password;
        },
      },
    }
  );
