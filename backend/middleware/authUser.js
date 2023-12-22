const jwt = require('jsonwebtoken');
const User = require('../model/User');
const CustomError = require('../utils/customError');

exports.authUser = async (req, res, next) => {
  // console.log(req.headers.authorization);
  let token = req.headers.authorization;

  if (!token) return next(new CustomError('Not authorized, no token', 401));

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, decode) => {
    if (error) {
      return next(new CustomError('Not authorized, invalid token', 401));
    } else {
      const user = await User.findOne({ _id: decode.userId });

      if (!user)
        return next(new CustomError('No User Found, Please Login again', 401));

      req.user = user;
      next();
    }
  });
};
