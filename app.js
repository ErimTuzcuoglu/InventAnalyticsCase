import express from 'express';
import config from './config/appConfig';
import expressConfig from './loaders/server/express';
import connection from './loaders/database/postgres/connection';
// middlewares
import { errorHandlingMiddleware } from './loaders/server/middlewares/errorHandlingMiddleware';

const app = express();

// express.js configuration (middlewares etc.)
expressConfig(app, config);

const startServer = async () => {
    // DB configuration and connection create
    if (process.env.NODE_ENV !== "test") {
        await connection(config).connectToPostgres();
    }

    // routes for each endpoint
    const { routes } = await import('./api/routes');
    routes(app);

    // error handling middleware
    app.use((err, req, res, next) => errorHandlingMiddleware(err, req, res, next));

    if (process.env.NODE_ENV !== 'test') {
        app.listen(config.port, () => {
            console.log(`Server is listening on port ${config.port}`);
        });
    }
}

startServer();

export default app;