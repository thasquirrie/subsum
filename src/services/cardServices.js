import {
  findCardById,
  createCard,
  updateCard,
  findCards,
} from '../factory/cardRepo';
import catchAsync from '../utils/catchAsync';

export const createCardService = catchAsync(async (req, res, next) => {
  const card = await createCard(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      card,
    },
  });
});

export const getCardService = catchAsync(async (req, res, next) => {
  const card = await findCardById(req.params.id);

  if (!card) return next(new AppError('No card found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      card,
    },
  });
});

export const getAllCardsService = catchAsync(async (req, res, next) => {
  const { _id } = req.user;

  const cards = await findCards(_id);

  res.status(200).json({
    status: 'success',
    results: cards.length,
    data: {
      cards,
    },
  });
});

export const editCardService = catchAsync(async (req, res, next) => {
  const card = await updateCard(req.params.id, req.body);

  if (!card) return next(new AppError('No card found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      card,
    },
  });
});

export const deleteCardService = catchAsync(async (req, res, next) => {
  const card = await deleteCard(req.params.id);

  if (!card) return next(new AppError('No card found with that ID', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
