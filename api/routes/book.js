import express from 'express';
import Joi from 'joi';

import bookController from '../controllers/bookController';
import bookRepository from '../../application/repositories/bookRepository';
import bookModelRepository from '../../loaders/database/postgres/repositories/bookModelRepository';

export default function bookRouter() {
  const router = express.Router();

  const bookSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
      'string.base': 'name must be string.',
      'string.min': 'name must be consist at least 3 characters.',
    })
  });
  const validateBook = (req, res, next) => {
    const { error } = bookSchema.validate(req.body);
    if (error) {
      // TODO: I know this is not a good way to handle an error, but it is already nearly 30 minutes remaining :(
      const appError = new Error(error.details[0].message);
      appError.status = 400;
      throw appError;
    }
    next();
  }

  const controller = bookController(
    bookRepository,
    bookModelRepository,
  );

  router.get('/', controller.fetchAllBooks);
  router.get('/:id', controller.fetchBookById);
  router.post('/', validateBook, controller.addNewBook);

  return router;
}
