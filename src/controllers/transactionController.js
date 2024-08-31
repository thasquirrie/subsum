import {
  deleteTransactionService,
  getAllTransactionsService,
  getTransactionService,
  getTransactionsForAUserService,
  updateTransactionService,
} from '../services/transactionServices.js';
import catchAsync from '../utils/catchAsync.js';

export const getAllTransactions = catchAsync(async (req, res, next) => {
  getAllTransactionsService(req, res, next);
});

export const getTransactionsForAUser = catchAsync(async (req, res, next) => {
  getTransactionsForAUserService(req, res, next);
});

export const getTransaction = catchAsync(async (req, res, next) => {
  getTransactionService(req, res, next);
});

export const updateTransaction = catchAsync(async (req, res, next) => {
  updateTransactionService(req, res, next);
});

export const deleteTransaction = catchAsync(async (req, res, next) => {
  deleteTransactionService(req, res, next);
});
