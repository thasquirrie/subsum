import { getAllTransactions } from '../factory/transactionRepo.js';
import catchAsync from '../utils/catchAsync.js';

export const getAllTransactionsService = catchAsync(async (req, res, next) => {
  const transactions = await getAllTransactions();

  res.status(200).json({
    status: 'success',
    results: transactions.length,
    data: {
      transactions,
    },
  });
});

export const getTransactionsForAUserService = catchAsync(
  async (req, res, next) => {
    const { _id } = req.user;

    const transactions = await getTransactionsByUserId(_id);

    res.status(200).json({
      status: 'success',
      results: transactions.length,
      data: {
        transactions,
      },
    });
  }
);

export const getTransactionService = catchAsync(async (req, res, next) => {
  const transaction = await findTransactionByTransactionNumber(
    req.params.transactionNumber
  );

  if (!transaction)
    return next(
      new AppError('No transaction found with that transaction number', 404)
    );

  res.status(200).json({
    status: 'success',
    data: {
      transaction,
    },
  });
});

export const updateTransactionService = catchAsync(async (req, res, next) => {
  const transaction = await updateTransaction(
    req.params.transactionNumber,
    req.body
  );

  if (!transaction)
    return next(
      new AppError('No transaction found with that transaction number', 404)
    );

  res.status(200).json({
    status: 'success',
    data: {
      transaction,
    },
  });
});

export const deleteTransactionService = catchAsync(async (req, res, next) => {
  const transaction = await deleteTransaction(req.params.transactionNumber);

  if (!transaction)
    return next(
      new AppError('No transaction found with that transaction number', 404)
    );

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export const mobileNetworks = catchAsync(async (req, res, next) => {
  const networks = [
    'MTN',
    'GLO',
    'Airtel',
    '9Mobile',
    'Spectranet',
    'Smile',
    'Swift',
  ];

  res.status(200).json({
    status: 'success',
    data: {
      networks,
    },
  });
});

export const covertAirtimeToCashService = catchAsync(async (req, res, next) => {
  const { amount, phoneNumber, network, pin } = req.body;

  const transaction = await convertAirtimeToCash(amount, phoneNumber, network);

  res.status(200).json({
    status: 'success',
    data: {
      transaction,
    },
  });
});
