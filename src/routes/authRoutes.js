import express from 'express';
import {
  forgotPassword,
  login,
  protect,
  resetPassword,
  sendOTP,
  signup,
  verifyEmailOTP,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/send-otp', sendOTP);
router.post('/verify', verifyEmailOTP);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', protect, resetPassword);

export default router;
