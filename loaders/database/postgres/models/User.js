import { DataTypes } from 'sequelize';
import connection from '../connection';
import BaseModel from '../common/baseModel';

const { sequelize } = connection();

const User = sequelize.define('User', {
  ...BaseModel,
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
  {
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
    scopes: {
      withCreatedAtAndUpdatedAt: {
        attributes: {},
      },
    }
  });

export default User;
