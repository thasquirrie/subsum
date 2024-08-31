import { hash, compare } from 'bcrypt';
import { model, Schema } from 'mongoose';
import randomNumber from 'random-number';

const options = {
  min: 1000000000000000,
  max: 9999999999999999n,
  integer: true,
};

const transactionSchema = Schema(
  {
    service: {
      type: String,
      required: [true, 'A transaction must have a service name'],
      minlength: [3, 'A transaction must have at least 3 characters'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'Individual',
      required: [true, 'A transaction must have a user'],
    },
    amount: {
      type: Number,
      required: [true, 'A transaction must have a '],
    },
    totalAmount: {
      type: Number,
      required: [true, 'A transaction must have a total amount'],
    },
    status: {
      type: String,
      enum: ['initiated', 'successful', 'failed'],
      default: 'initiated',
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'wallet', 'transfer'],
      required: [true, 'A transaction must have a payment method'],
    },
    transactionNumber: {
      type: String,
      required: [true, 'A transaction must have a transaction number'],
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: true,
    toObject: true,
  }
);

transactionSchema.pre('save', async function (next) {
  if (!this.isNew) return next();
  this.transactionNumber = randomNumber(options);

  next();
});

const Transaction = model('Transaction', transactionSchema);

export default Transaction;
