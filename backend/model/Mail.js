const mongoose = require('mongoose');

const mailSchema = new mongoose.Schema(
  {
    to: {
      type: String,
      required: [true, 'Recipient email is required!'],
    },

    from: String,

    subject: String,

    message: { type: String },

    bin: { type: Boolean, defaultValue: false },

    starred: { type: Boolean, defaultValue: false },

    type: String,

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

//Export the model
module.exports = mongoose.model('Mail', mailSchema);
