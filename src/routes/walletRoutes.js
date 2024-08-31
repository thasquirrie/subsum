import express from 'express';
import {
  createWallet,
  deleteWalletById,
  getAllWallets,
  getWalletById,
  updateWalletById,
} from '../controllers/walletController.js';
import { protect } from '../controllers/authController.js';

const router = express.Router();

router.use(protect);

router.route('/').post(createWallet).get(getAllWallets);
router
  .route('/:id')
  .get(getWalletById)
  .patch(updateWalletById)
  .delete(deleteWalletById);

export default router;
