import { Schema, model } from 'mongoose';
import random from 'random-number';
import randomNumber from 'random-number';

const options = {
  min: 1000000000000000,
  max: 9999999999999999n,
  integer: true,
};

const walletSchema = Schema(
  {
    walletId: {
      type: String,
      required: [true, 'A wallet must have a wallet ID'],
      unique: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'Individual',
      required: [true, 'A wallet must have a user'],
    },
    currency: {
      type: String,
      default: 'NGN',
      required: [true, 'A wallet must have a currency'],
    },
  },
  {
    timestamps: true,
    toObject: true,
    toJSON: true,
  }
);

walletSchema.pre('save', async function (next) {
  if (!this.isNew) return next();
  this.walletId = randomNumber(options);

  next();
});

const Wallet = model('Wallet', walletSchema);

export default Wallet;
