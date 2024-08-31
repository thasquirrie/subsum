import express from 'express';
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../controllers/userControllers.js';
import { protect } from '../controllers/authController.js';

const router = express.Router();

router.use(protect);

router.route('/').get(getUsers);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
