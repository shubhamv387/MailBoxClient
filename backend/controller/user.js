const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// @desc    Sign Up User
// @route   POST /api/users/register
// @access  Public
exports.register = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const existingUser = await User.findOne({ email }).select('-password');

    if (password !== confirmPassword)
      return res.status(400).json({
        success: false,
        message: 'Password and confirm password does not matches!',
      });

    if (existingUser)
      return res
        .status(409)
        .json({ success: false, message: 'Email already exists!' });

    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const user = new User({
      name: name || '',
      email: email,
      password: hashedPassword,
    });

    await user.save({ session });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '30d',
    });

    // throw new Error("custom error");

    await session.commitTransaction();
    res.status(201).json({
      success: true,
      message: 'User Created Successfully!',
      userDetails: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    await session.abortTransaction();
    console.log(err.message.underline.red);
  } finally {
    await session.endSession();
  }
};

// @desc    Login User
// @route   POST /api/users/login
// @access  Public
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email }).select('+password');

    if (!existingUser)
      return res
        .status(404)
        .json({ success: false, message: 'User does not Exists!' });

    const isCorrectPassword = bcrypt.compareSync(
      password,
      existingUser.password
    );

    if (!isCorrectPassword)
      return res
        .status(400)
        .json({ success: false, message: 'Wrong Credentials!' });

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '30d',
      }
    );

    return res.status(200).json({
      success: true,
      message: 'User Logged in Successfully!',
      userDetails: {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

// @desc    Get user profile
// @route   GET /api/users/validate-token
// @access  Private
exports.validateToken = async (req, res, next) => {
  res.status(200).json({ success: true, message: 'valid token' });
};
