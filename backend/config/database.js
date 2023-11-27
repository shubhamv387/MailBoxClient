const mongoose = require('mongoose');

const connectdb = async () => {
  return await mongoose.connect(process.env.MONGO_URL);
};

module.exports = connectdb;
