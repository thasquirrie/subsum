import express from 'express';
import {
  deleteTransaction,
  getAllTransactions,
  getTransaction,
  getTransactionsForAUser,
  updateTransaction,
} from '../controllers/transactionController.js';
import { protect } from '../controllers/authController.js';

const router = express.Router();

router.use(protect);

router.get('/', getAllTransactions);
router.get('/user', getTransactionsForAUser);
router
  .route('/:transactionNumber')
  .get(getTransaction)
  .patch(updateTransaction)
  .delete(deleteTransaction);

export default router;
