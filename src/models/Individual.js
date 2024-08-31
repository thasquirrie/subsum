import { Schema, model } from 'mongoose';
import { hash, compare } from 'bcrypt';
import randomNumber from 'random-number';

const individualSchema = Schema(
  {
    type: {
      type: String,
      required: [true, 'A user must have a type'],
      trim: true,
      enum: ['individual', 'merchant'],
    },
    firstName: {
      type: String,
      required: [true, 'A user must have a first name'],
      minlength: [3, 'Must not be less than 3 characters'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'A user must have a last name'],
      minlength: [3, 'Must not be less than 3 characters'],
      trim: true,
    },
    middleName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'A user must have an email'],
      minlength: [3, 'Must not be less than 3 characters'],
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'A user must have an phone'],
      minlength: [3, 'Must not be less than 3 characters'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'A user must have a password'],
      minlength: [8, 'Must not be less than 8 characters'],
      default: 'password',
    },

    passordChangedAt: Date,
    pin: {
      type: String,
      required: [true, 'A user must have a pin'],
      minlength: [4, 'Must not be less than 4 characters'],
      maxlength: [4, 'Must not be more than 4 characters'],
      default: '0000',
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    referralCode: {
      type: String,
      unique: true,
      required: [true, 'A user must have a referral code'],
      default: '0000',
    },
    referrals: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

individualSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await hash(this.password, 10);

  next();
});

individualSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) return next();

  this.passwordChangedAt = Date.now() - 2000;
  next();
});

individualSchema.pre('save', async function (next) {
  console.log('isNew:', this.isNew);
  if (!this.isNew) return next();
  const generator = randomNumber.generator({
    min: 0,
    max: 9,
    integer: true,
  });

  const randomDigit = () => generator();
  const randomLetter = () =>
    String.fromCharCode(
      randomNumber.generator({
        min: 97,
        max: 122,
        integer: true,
      })()
    );

  const digits = [randomDigit(), randomDigit()];
  const letters = [randomLetter(), randomLetter(), randomLetter()];
  const symbol = '/';

  console.log({ digits, letters, symbol });

  const result = `${digits.join(
    ''
  )}${symbol}${randomDigit()}${randomDigit()}${letters.join(
    ''
  )}${randomDigit()}${randomDigit()}${randomDigit()}`;

  this.referralCode = result;

  next();
});

individualSchema.methods.comparePasswords = async function (
  candidatePassword,
  userPassword
) {
  return await compare(candidatePassword, userPassword);
};

individualSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }
};

const Individual = model('Individual', individualSchema);

export default Individual;
