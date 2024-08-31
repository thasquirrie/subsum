import { model, Schema } from 'mongoose';
const cardSchema = Schema(
  {
    cardNumber: {
      type: String,
      required: [true, 'A card must have a card number'],
      minlength: [16, 'Must not be less than 16 characters'],
      maxlength: [16, 'Must not be more than 16 characters'],
      trim: true,
    },
    cardHolderName: {
      type: String,
      required: [true, 'A card must have a card holder name'],
      minlength: [3, 'Must not be less than 3 characters'],
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'Individual',
      required: [true, 'A card must have a user'],
    },
    expiryDate: {
      type: String,
      required: [true, 'A card must have an expiry date'],
      validate: {
        validator: function (v) {
          return /\d{2}\/\d{2}/.test(v);
        },
        message: (props) => `${props.value} is not a valid expiry date!`,
      },
    },
    cvv: {
      type: String,
      required: [true, 'A card must have a cvv'],
      minlength: [3, 'Must not be less than 3 characters'],
      maxlength: [3, 'Must not be more than 3 characters'],
      trim: true,
    },
    cardType: {
      type: String,
      required: [true, 'A card must have a card type'],
      enum: ['visa', 'mastercard'],
    },
    status: {
      type: String,
      required: [true, 'A card must have a status'],
      default: 'active',
    },
    pin: {
      type: String,
      required: [true, 'A card must have a pin'],
      minlength: [4, 'Must not be less than 4 characters'],
      maxlength: [4, 'Must not be more than 4 characters'],
      trim: true,
    },
  },
  {
    timestamps: true,
    toObject: true,
    toJSON: true,
  }
);

const Card = model('Card', cardSchema);

export default Card;
