import {
  createWallet,
  findWalletByUserId,
  findWalletByWalletId,
  getAllWallets,
  updateWallet,
} from '../factory/walletRepo.js';
import catchAsync from '../utils/catchAsync.js';

export const createWalletService = catchAsync(async (req, res, next) => {
  const { _id } = req.user;

  let wallet = await findWalletByUserId(_id);

  if (wallet)
    return next(new AppError('Wallet already exists for this user', 400));

  wallet = await createWallet();

  res.status(201).json({
    status: 'success',
    data: {
      wallet,
    },
  });
});

export const getWalletByIdService = catchAsync(async (req, res, next) => {
  const wallet = await findWalletByWalletId(req.params.id);

  if (!wallet) return next(new AppError('No wallet found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      wallet,
    },
  });
});

export const getWalletByUserIdService = catchAsync(async (req, res, next) => {
  const { _id } = req.user;

  const wallet = await findWalletByUserId(_id);

  if (!wallet) return next(new AppError('No wallet found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      wallet,
    },
  });
});

export const getAllWalletsService = catchAsync(async (req, res, next) => {
  const wallets = await getAllWallets();

  res.status(200).json({
    status: 'success',
    results: wallets.length,
    data: {
      wallets,
    },
  });
});

export const updateWalletService = catchAsync(async (req, res, next) => {
  const { _id } = req.user;

  const wallet = await updateWallet(_id, req.body);

  if (!wallet) return next(new AppError('No wallet found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      wallet,
    },
  });
});

export const updateWalletByIdService = catchAsync(async (req, res, next) => {
  const wallet = await updateWallet(req.params.id, req.body);

  if (!wallet) return next(new AppError('No wallet found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      wallet,
    },
  });
});

export const deleteWalletByUserIdService = catchAsync(
  async (req, res, next) => {
    const { _id } = req.user;
    const wallet = await deleteWallet(_id);

    if (!wallet) return next(new AppError('No wallet found with that ID', 404));

    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
);

export const deleteWalletByIdService = catchAsync(async (req, res, next) => {
  const wallet = await deleteWallet(req.params.id);

  if (!wallet) return next(new AppError('No wallet found with that ID', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export const fundWalletService = catchAsync(async (req, res, next) => {
  const { _id } = req.user;

  const wallet = await updateWallet(_id, req.body);

  if (!wallet) return next(new AppError('No wallet found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      wallet,
    },
  });
});
