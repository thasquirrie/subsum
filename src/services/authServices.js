import {
  findTokenByEmail,
  createToken,
  findToken,
} from '../factory/tokenRepo.js';
import {
  createUser,
  findOneAndUpdate,
  findUserByEmail,
  findUserByIdAndUpdate,
} from '../factory/userRepo.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import JWT from 'jsonwebtoken';
import randomNumber from 'random-number';
import Individual from '../models/Individual.js';
import { newmailer } from '../config/newmailer.js';
import { verifyEmail, welcomeEmail } from '../data/emails.js';

const options = {
  min: 100000,
  max: 1000000,
  integer: true,
};

const signToken = (id) => {
  return JWT.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSignedToken = (user, res, statusCode, message) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    status: 'success',
    token,
    message,
    data: {
      user,
    },
  });
};

export const formatType = (type) => {
  const modelType =
    type === 'individual' ? Individual : type === 'sme' ? '' : '';

  return modelType;
};

export const signupService = catchAsync(async (req, res, next) => {
  const individualRequired = [
    'email',
    'password',
    'firstName',
    'lastName',
    'type',
  ];
  const merchantRequired = [
    'email',
    'companyName',
    'password',
    'firstName',
    'lastName',
    'type',
  ];

  if (req.body.type === 'individual') {
    for (const param of individualRequired) {
      if (!req.body[param])
        return next(new AppError(`Please provide ${param} to continue`, 400));
    }
  } else if (req.body.type === 'merchant') {
    for (const param of merchantRequired) {
      if (!req.body[param])
        return next(new AppError(`Please provide ${param} to continue`, 400));
    }
  }

  const { referralCode } = req.body;

  if (referralCode) {
    const referringUser = await findOneAndUpdate(
      Individual,
      { referralCode },
      { $inc: { referrals: 1 } }
    );

    if (!referringUser) return next(new AppError('Invalid referral code', 400));

    console.log({ referringUser });
  }

  const user = await createUser(Individual, req.body);

  console.log({ user });

  createLogger.info(`signupService => User created successfully`);

  const pin = randomNumber(options);

  let token = await findTokenByEmail(req.body.email);

  if (!token) {
    token = await createToken({ pin, email: req.body.email });
  }

  const name = req.body.firstName.split(' ')[0];
  const subject = 'Verification Email';
  const message = verifyEmail(name, pin);

  await newmailer(req.body.email, subject, message);

  createLogger.info(`Signup => Email to ${req.body.email} sent successful`);

  console.log({ token });

  res.status(201).json({
    status: 'success',
    message: `Welcome ${name}, please check your email for a verification code`,
    data: {
      user,
    },
  });
});

export const verifyEmailOTPService = catchAsync(async (req, res, next) => {
  const { pin, email } = req.body;

  const token = await findToken(email, pin);

  if (!token) return next(new AppError('Incorrect OTP', 400));

  if (Date.parse(token.updatedAt) + 5 * 60 * 1000 < Date.now())
    return next(new AppError('OTP expired already', 400));

  const user = findUserByEmail(Individual, req.body.email);

  user.email_verified = true;

  await user.save();

  const subject = 'Welcome to Deepcode';
  const message = welcomeEmail();

  await newmailer(req.body.email, subject, message);

  res.status(200).json({
    status: 'success',
    message: 'Email verified successfully',
  });
});

export const sendOTPService = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const pin = randomNumber(options);

  let token = await findToken(email, pin);

  if (!token) {
    token = await createToken({ pin, email });
  } else {
    token.pin = pin;
    await token.save();
  }

  const name = email.split('@')[0];
  const subject = 'Verification Token';
  const message = verifyEmail(name, pin);

  await newmailer(email, subject, message);

  res.status(200).json({
    status: 'success',
    message: 'Verification email sent',
  });
});

export const loginService = catchAsync(async (req, res, next) => {
  const { email, password, type } = req.body;

  if (!email || !password)
    return next(new AppError('Provide both inputs to proceed', 400));

  const user = await findUserByEmail(Individual, email, '+password');

  console.log({ user });

  if (!user || !(await user?.comparePasswords(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  createSignedToken(user, res, 200, 'Login successful');
});

export const changePassword = catchAsync(async (req, res, next) => {});

export const forgotPasswordService = catchAsync(async (req, res, next) => {
  const { email, type } = req.body;

  const modelType = formatType(type);

  if (!modelType) return next(new AppError('Invalid user type', 400));

  const user = await findUserByEmail(modelType, email);

  if (!user) return next(new AppError('Email provided does not exist', 400));

  const pin = randomNumber(options);

  let token = await findTokenByEmail(email);

  if (!token) {
    token = await createToken({ pin, email });
  } else {
    token.pin = pin;
    await token.save();
  }

  const subject = 'Forgot Password';
  //   const message = reset

  res.status(200).json({
    status: 'success',
    message: `A verification code has been sent to your email`,
  });
});

export const resetPasswordService = catchAsync(async (req, res, next) => {
  const { pin, newPassword, confirmPassword, email } = req.body;

  if (!pin) return next(new AppError('Please provide a pin to continue', 400));

  const token = await findToken(email, pin);

  if (!token) return next(new AppError('Invalid pin provided', 400));

  if (newPassword !== confirmPassword)
    return next(new AppError('Passwords do not match', 400));

  const user = await findUserByEmail(Model, token.email);

  user.password = newPassword;

  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'Password reset successfully',
  });
});

export const setPin = catchAsync(async (req, res, next) => {
  if (!req.body.pin || req.body.confirmPin)
    return next(new AppError('Please provide a pin to continue', 400));

  if (req.body.pin === req.body.confirmPin)
    return next(new AppError('Pins do not match', 400));

  const user = await findUserByIdAndUpdate(Individual, req.params.id, req.body);

  if (!user) return next(new AppError('No user found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
