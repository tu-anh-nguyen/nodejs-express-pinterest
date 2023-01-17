//DO NOT EDIT: code generated from 'tools/gen-err-code.go'
const errNameToAppError = {
  ErrUnknown: {
    statusCode: 500,
    code: 1000,
    message: 'Something went wrong',
  },
  ErrInvalidArgument: {
    statusCode: 200,
    code: 1001,
    message: 'Invalid argument',
  },
  ErrLogin: {
    statusCode: 200,
    code: 1002,
    message: 'Invalid email or password',
  },
  ErrUnauthenticated: {
    statusCode: 401,
    code: 1003,
    message: 'Unauthentication',
  },
  ErrPermissionDenied: {
    statusCode: 403,
    code: 1006,
    message: 'Permission denied',
  },
  ErrAccountExisted: {
    statusCode: 200,
    code: 1007,
    message: 'Account already existed',
  },
  ErrUserNotFound: {
    statusCode: 400,
    code: 2000,
    message: 'User not found',
  },
  ErrRestaurantNotFound: {
    statusCode: 400,
    code: 2001,
    message: 'Restaurant not found',
  },
  ErrFoodTypeNotFound: {
    statusCode: 400,
    code: 2002,
    message: 'Food type not found',
  },
  ErrFoodNotFound: {
    statusCode: 400,
    code: 2003,
    message: 'Food not found',
  },
  ErrSubFoodNotFound: {
    statusCode: 400,
    code: 2004,
    message: 'Sub food not found',
  },
  ErrOrderNotFound: {
    statusCode: 400,
    code: 2005,
    message: 'Order not found',
  }
}

module.exports = errNameToAppError;
