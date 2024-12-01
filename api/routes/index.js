import userRouter from './user';
import bookRouter from './book';

export function routes(app) {
  app.use('/books', bookRouter());
  app.use('/users', userRouter());

  return app;
}
