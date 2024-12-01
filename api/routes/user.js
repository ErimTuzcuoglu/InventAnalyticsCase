import express from 'express';
import Joi from 'joi';

import userController from '../controllers/userController';
import userRepository from '../../application/repositories/userRepository';
import userModelRepository from '../../loaders/database/postgres/repositories/userModelRepository';

export default function userRouter() {
  const router = express.Router();

  const userSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
      'string.base': 'name must be string.',
      'string.min': 'name must be consist at least 3 characters.',
    })
  });
  const returnBookSchema = Joi.object({
    score: Joi.number().required().messages({
      'number.base': 'Score must be a number.',
      'any.required': 'Score is required.',
    }),
  });
  const validateBody = (req, res, next) => {
    // TODO: I know this is not a good way to handle the schema and an error, but it is already nearly 30 minutes remaining :(
    const schema = req.path === '/' ? userSchema : returnBookSchema;
    const { error } = (schema).validate(req.body);
    if (error) {
      const appError = new Error(error.details[0].message);
      appError.status = 400;
      throw appError;
    }
    next();
  }

  const controller = userController(
    userRepository,
    userModelRepository,
  );

  router.get('/', controller.fetchAllUsers);
  router.get('/:id', controller.fetchUserById);
  router.post('/', validateBody, controller.addNewUser);
  router.post('/:id/borrow/:bookId', controller.borrowBookToUser);
  router.post('/:id/return/:bookId', validateBody, controller.returnBookFromUser);

  return router;
}
