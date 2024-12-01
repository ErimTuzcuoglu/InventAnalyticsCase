import { DataTypes } from 'sequelize';
import connection from '../connection';
import BaseModel from '../common/baseModel';

const { sequelize } = connection();

const BorrowedBook = sequelize.define('BorrowedBook', {
  ...BaseModel,
  score: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: -1
  },
  isReturned: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
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

export default BorrowedBook;
