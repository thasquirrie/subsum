import {
  deleteUserService,
  getUserService,
  getUsersService,
  updateUserService,
} from '../services/userServices.js';
import catchAsync from '../utils/catchAsync.js';

export const getUsers = catchAsync(async (req, res, next) => {
  getUsersService(req, res, next);
});

export const getUser = catchAsync(async (req, res, next) => {
  getUserService(req, res, next);
});

export const updateUser = catchAsync(async (req, res, next) => {
  updateUserService(req, res, next);
});

export const deleteUser = catchAsync(async (req, res, next) => {
  deleteUserService(req, res, next);
});
