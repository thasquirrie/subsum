import catchAsync from '../utils/catchAsync.js';

export const createCard = catchAsync(async (req, res, next) => {
  createCardService(req, res, next);
});

export const getCard = catchAsync(async (req, res, next) => {
  getCardService(req, res, next);
});

export const getAllCards = catchAsync(async (req, res, next) => {
  getAllCardsService(req, res, next);
});

export const editCard = catchAsync(async (req, res, next) => {
  editCardService(req, res, next);
});

export const deleteCard = catchAsync(async (req, res, next) => {
  deleteCardService(req, res, next);
});
