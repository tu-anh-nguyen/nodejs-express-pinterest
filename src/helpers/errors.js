class SugarError extends Error {
  constructor({
    statusCode = 500,
    code = 1000,
    message = 'Something went wrong',
    debugMessage = '',
    ...params
  }) {
    super(params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SugarError);
    }
    this.statusCode = statusCode;
    this.code = code;
    this.message = message;
    this.error = message;
    this.debugMessage = debugMessage;
  }
}

const handleErrors = (error, _req, res, next) => {
  if (!error instanceof SugarError) {
    error = new SugarError({
      statusCode: 500,
      code: 2000,
      message: error,
    });
  }
  const { statusCode, code, message, stack } = error;
  const debugMessage = stack.split('\n').map((line) => line.trim());
  res.status(statusCode).json({
    status: false,
    code,
    message,
    debugMessage,
  });
  next();
};

module.exports = {
  SugarError,
  handleErrors,
};
