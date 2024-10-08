import AppError from '../utils/appError.js';

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}`;
  return new AppError(message, 400);
};

const handleDuplicateField = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value`;
  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  console.log(err.errors);
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () => {
  return new AppError('Invalid token. Please log in again', 401);
};

const handleJWTExpiredError = () => {
  return new AppError('Token has expired. Please log in again', 401);
};

const sendErrorDev = (err, req, res) => {
  console.log({ err });
  if (req.originalUrl.startsWith('/api')) {
    console.error('Error:', err);
    // logger.error(`ErrorController => ${err}`);
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  } else {
    res.status(err.statusCode).render('error', {
      title: 'Uh oh! Something wrong occurred.',
      msg: err.message,
    });
  }
};

const sendErrorProd = (err, req, res) => {
  // API
  if (req.originalUrl.startsWith('/api')) {
    console.log('Operational:', err.isOperational);
    // if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // } else {
    //   console.error('ERROR!:', err);

    //   res.status(500).json({
    //     status: 'error',
    //     message: 'Something went very wrong! Try again!',
    //     // message: err,
    //   });
    // }
  } else {
    if (err.isOperational) {
      res.status(err.statusCode).render('error', {
        title: 'Something went wrong',
        msg: err.message,
      });
    } else {
      console.error('ERROR!:', err);

      res.status(500).render('error', {
        title: 'Something went wrong',
        msg: 'Please try again',
      });
    }
  }
};

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    if (err.name === 'JsonWebTokenError') err = handleJWTError();
    if (err.name === 'TokenExpiredError') err = handleJWTExpiredError();
    sendErrorDev(err, req, res);
    next();
  } else if (process.env.NODE_ENV === 'production') {
    console.log({ err });
    console.log(err.statusCode);
    let error = { ...err };
    if (err.name === 'CastError') err = handleCastErrorDB(err);
    if (err.code === 11000) err = handleDuplicateField(err);
    if (err.name === 'JsonWebTokenError') err = handleJWTError();
    if (err.name === 'TokenExpiredError') err = handleJWTExpiredError();
    if (err.errors) err = handleValidationError(err);
    if (err.name) sendErrorProd(err, req, res);
  }
};

export default errorHandler;
