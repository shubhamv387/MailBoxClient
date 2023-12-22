const asyncErrorHandler = (cb) => {
  return (req, res, next) => {
    cb(req, res, next).catch((err) => next(err));
  };
};

module.exports = asyncErrorHandler;
