module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorResponse = {
    success: false,
    message: err.isOperational ? err.message : 'Something went wrong!',
  };

  if (process.env.NODE_ENV === 'dev' && err.isOperational) {
    errorResponse.stack = err.stack;
  }

  res.status(statusCode).json(errorResponse);
};
