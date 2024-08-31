import {
  findUserById,
  findUserByIdAndUpdate,
  getAllUsers,
} from '../factory/userRepo.js';
import Individual from '../models/Individual.js';
import catchAsync from '../utils/catchAsync.js';

export const getUserService = catchAsync(async (req, res, next) => {
  const user = await findUserById(Individual, req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

export const getUsersService = catchAsync(async (req, res, next) => {
  const users = await getAllUsers(Individual);

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

export const updateUserService = catchAsync(async (req, res, next) => {
  if (req.body)
    return next(new AppError('Please provide a body to continue', 400));

  if (req.body.password)
    return next(
      new AppError('Cannot update password here. Use the dedicated route', 400)
    );

  const user = await findUserByIdAndUpdate(Individual, req.params.id, req.body);

  if (!user) return next(new AppError('No user found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

export const deleteUserService = catchAsync(async (req, res, next) => {
  const user = await deleteUser(Individual, req.params.id);

  if (!user) return next(new AppError('No user found with that ID', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
