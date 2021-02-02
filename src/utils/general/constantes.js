export const STATUS_CODE = {
  success: 200,
  created: 201,
  accepted: 202,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  internalError: 500,
  badGateway: 502,
  serviceUnavailable: 503,
};

export const defaultMessages = {
  userExists: 'User already exists',
  userCreated: 'User created',
  invalidLogin: 'Invalid login! Invalid user or password',
  changedUser: 'Alterações realizadas',
  userNotFound: 'User not found',
  tokenNotAuthorized: 'Fails on auth the token',
  noTokenProvided: 'No token was provided',
};
