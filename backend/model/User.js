const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
      min: 6,
    },
    unreadMailCount: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true }
);

//Export the model
module.exports = mongoose.model('User', userSchema);
