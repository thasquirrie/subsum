import express from 'express';
import {
  createCard,
  editCard,
  getAllCards,
  getCard,
} from '../controllers/cardController.js';
import { deleteCard } from '../factory/cardRepo.js';
import { protect } from '../controllers/authController.js';

const router = express.Router();

router.use(protect);

router.route('/').get(getAllCards).post(createCard);
router.route('/:id').get(getCard).patch(editCard).delete(deleteCard);

export default router;
