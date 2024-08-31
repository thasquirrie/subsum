import express, { json, urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import createLogger from './src/config/logger.js';
import morgan from 'morgan';
import helmet from 'helmet';
import errorHandler from './src/controllers/errorController.js';
import AppError from './src/utils/appError.js';

const corsOptions = {
  origin: '*',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  optionsSuccessfulStatus: 204,
};

const app = express();

global.createLogger = createLogger({ label: 'Subsum' });

app.use(helmet());
app.use(cors(corsOptions));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('combined', { stream: createLogger.stream }));

import authRouter from './src/routes/authRoutes.js';
import cardRouter from './src/routes/cardRoutes.js';
import transactionRouter from './src/routes/transactionRoutes.js';
import userRouter from './src/routes/userRoutes.js';
import walletRouter from './src/routes/walletRoutes.js';

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/cards', cardRouter);
app.use('/api/v1/transactions', transactionRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/wallets', walletRouter);

app.use((req, res, next) => {
  console.log('Body:', req.body);
  next();
});

app.all('*', (req, res, next) => {
  next(
    new AppError(
      `The requested page: ${req.originalUrl} using the method: ${req.method} not found on this server`,
      404
    )
  );
});

app.use(errorHandler);

export default app;
