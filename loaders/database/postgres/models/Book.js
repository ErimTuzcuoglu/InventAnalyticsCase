import { DataTypes } from 'sequelize';
import connection from '../connection';
import BaseModel from '../common/baseModel';

const { sequelize } = connection();

const Book = sequelize.define('Book', {
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
    },
  });

export default Book;
