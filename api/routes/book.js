import express from 'express';

import bookController from '../controllers/bookController';
import bookRepository from '../../application/repositories/bookRepository';
import bookModelRepository from '../../loaders/database/postgres/repositories/bookModelRepository';

export default function bookRouter() {
  const router = express.Router();

  const controller = bookController(
    bookRepository,
    bookModelRepository,
  );

  router.get('/', controller.fetchAllBooks);
  router.get('/:id', controller.fetchBookById);
  router.post('/', controller.addNewBook);

  return router;
}
