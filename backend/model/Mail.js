const mongoose = require('mongoose');

const mailSchema = new mongoose.Schema(
  {
    to: {
      type: String,
      required: [true, 'Receiver email is required!'],
    },

    from: String,

    subject: String,

    body: { type: String },

    bin: { type: Boolean, default: false },

    starred: { type: Boolean, default: false },

    type: String,

    date: {
      type: Date,
      default: () => Date.now(),
    },

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { versionKey: false, timestamps: false }
);

//Export the model
module.exports = mongoose.model('Mail', mailSchema);
