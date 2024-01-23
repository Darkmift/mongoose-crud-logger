import express, { Express, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { NODE_ENV, PORT, LOG_FORMAT, MONGO_URI } from '@config';
import validateEnv from './utils/validateEnv';
import { logger, stream } from '@utils/logger';
import mongoose from 'mongoose';
import mainRoutes from './api/index.routes';

validateEnv();

dotenv.config();

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    });

const app: Express = express();
const port = PORT || 5000;

app.use(morgan(LOG_FORMAT, { stream }));

app.use(express.json());

app.use('/api', mainRoutes);

app.use((err: any, req: Request, res: Response, _: NextFunction) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
    });
});

app.listen(port, () => {
    console.log(`⚡️[NODE_ENV]: ${NODE_ENV}`);
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);

    logger.info(`=================================`);
    logger.info(`======= ENV: ${NODE_ENV} =======`);
    logger.info(`🚀 [server]: Server is running at https://localhost:${port}`);
    logger.info(`=================================`);
});
