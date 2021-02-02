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
  users: {
    exists: 'User already exists',
    created: 'User created',
    invalidLogin: 'Invalid login! Invalid user or password',
    changed: 'Alterações realizadas',
    notFound: 'User not found',
  },

  token: {
    notAuthorized: 'Fails on auth the token',
    notProvided: 'No token was provided',
  },

  favorites: {
    exists: 'Favorite already exists',
    activated: 'Favorite activated',
    created: 'Favorite created',
    notFound: 'Favorite not found',
    noFavorites: 'No favorites registered',
  },
};
