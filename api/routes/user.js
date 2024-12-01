import express from 'express';

import userController from '../controllers/userController';
import userRepository from '../../application/repositories/userRepository';
import userModelRepository from '../../loaders/database/postgres/repositories/userModelRepository';

export default function userRouter() {
  const router = express.Router();

  const controller = userController(
    userRepository,
    userModelRepository,
  );

  router.get('/', controller.fetchAllUsers);
  router.get('/:id', controller.fetchUserById);
  router.post('/', controller.addNewUser);
  router.post('/:id/borrow/:bookId', controller.borrowBookToUser);
  router.post('/:id/return/:bookId', controller.returnBookFromUser);

  return router;
}
