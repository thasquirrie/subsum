import { findUserById } from '../factory/userRepo.js';
import {
  forgotPasswordService,
  formatType,
  loginService,
  resetPasswordService,
  sendOTPService,
  signupService,
  verifyEmailOTPService,
} from '../services/authServices.js';
import catchAsync from '../utils/catchAsync.js';

export const signup = catchAsync(async (req, res, next) =>
  signupService(req, res, next)
);

export const login = catchAsync(async (req, res, next) =>
  loginService(req, res, next)
);

export const forgotPassword = catchAsync(async (req, res, next) =>
  forgotPasswordService(req, res, next)
);

export const verifyEmailOTP = catchAsync(async (req, res, next) =>
  verifyEmailOTPService(req, res, next)
);

export const sendOTP = catchAsync(async (req, res, next) =>
  sendOTPService(req, res, next)
);

export const resetPassword = catchAsync(async (req, res, next) =>
  resetPasswordService(req, res, next)
);

export const protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  )
    token = req.headers.authorization.split(' ')[1];

  if (!token)
    return next(new AppError('You need to be logged in to continue', 401));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await findUserById(Individual, decoded.id);

  if (!currentUser)
    return next(new AppError('Invalid token, login again', 401));

  if (await currentUser.changedPasswordAfter(decoded.iat))
    return next(
      new AppError(
        'Password has been changed after last login. Please login again',
        409
      )
    );

  req.user = currentUser;
  next();
});
