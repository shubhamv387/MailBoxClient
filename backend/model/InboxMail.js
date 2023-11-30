const mongoose = require('mongoose');

const inboxMailSchema = new mongoose.Schema(
  {
    to: {
      type: String,
      required: [true, 'Receiver email is required!'],
    },

    from: {
      type: String,
      required: [true, 'sender email is required!'],
    },

    subject: String,

    body: { type: String },

    // bin: { type: Boolean, default: false },

    starred: { type: Boolean, default: false },

    markasread: { type: Boolean, default: false },

    date: {
      type: Date,
      default: () => Date.now(),
    },
  },
  { versionKey: false, timestamps: false }
);

//Export the model
module.exports = mongoose.model('InboxMail', inboxMailSchema);
