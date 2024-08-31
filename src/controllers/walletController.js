import {
  createWalletService,
  deleteWalletByUserIdService,
  getAllWalletsService,
  getWalletByIdService,
  getWalletByUserIdService,
  updateWalletByIdService,
  updateWalletService,
} from '../services/walletServices.js';
import catchAsync from '../utils/catchAsync.js';

export const createWallet = catchAsync(async (req, res, next) => {
  createWalletService(req, res, next);
});

export const getWalletById = catchAsync(async (req, res, next) => {
  getWalletByIdService(req, res, next);
});

export const getWalletByUserId = catchAsync(async (req, res, next) => {
  getWalletByUserIdService(req, res, next);
});

export const getAllWallets = catchAsync(async (req, res, next) => {
  getAllWalletsService(req, res, next);
});

export const updateWallet = catchAsync(async (req, res, next) => {
  updateWalletService(req, res, next);
});

export const updateWalletById = catchAsync(async (req, res, next) => {
  updateWalletByIdService(req, res, next);
});

export const fundWallet = catchAsync(async (req, res, next) => {
  fundWalletService(req, res, next);
});

export const deleteWalletByUserId = catchAsync(async (req, res, next) => {
  deleteWalletByUserIdService(req, res, next);
});

export const deleteWalletById = catchAsync(async (req, res, next) => {
  deleteWalletByIdService(req, res, next);
});
