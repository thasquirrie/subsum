import { model, Schema } from "mongoose";
const tokenSchema = Schema(
  {
    email: {
      type: String,
      required: [true, "A token has to have an email to be attached to."],
    },
    pin: {
      type: Number,
      required: [true, "A token must have a pin"],
      minlength: [6, "A pin must be 6 characters long"],
    },
  },
  {
    timestamps: true,
  }
);

const Token = model("Token", tokenSchema);

export default Token;
