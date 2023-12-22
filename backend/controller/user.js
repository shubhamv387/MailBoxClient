const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const CustomError = require('../utils/customError');

// @desc    Sign Up User
// @route   POST /api/users/register
// @access  Public
exports.register = asyncErrorHandler(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  const existingUser = await User.findOne({ email }).select('-password');

  if (password !== confirmPassword)
    throw new CustomError(
      'Password and confirm password does not matches!',
      400
    );

  if (existingUser) throw new CustomError('Email already exists!', 409);

  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const user = new User({
    name: name || '',
    email: email,
    password: hashedPassword,
  });

  await user.save();

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '30d',
  });

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
});

// @desc    Login User
// @route   POST /api/users/login
// @access  Public
exports.login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || email.indexOf('@') === -1)
    throw new CustomError('Wrong Credentials!', 400);

  const existingUser = await User.findOne({ email }).select('+password');

  if (!existingUser) throw new CustomError('Wrong Credentials!', 400);

  const isCorrectPassword = bcrypt.compareSync(password, existingUser.password);

  if (!isCorrectPassword) throw new CustomError('Wrong Credentials!', 400);

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
});

// @desc    Get user profile
// @route   GET /api/users/validate-token
// @access  Private
exports.validateToken = (req, res, next) => {
  res.status(200).json({ success: true, message: 'valid token' });
  // valid because it is getting checked in auth middleware
};
