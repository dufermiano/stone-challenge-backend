import jwt from 'jsonwebtoken';
import { responseHandler, errorHandler } from '../general';
import { STATUS_CODE, defaultMessages } from '../general/constantes';

const verifyJWT = (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    if (!token) {
      return responseHandler({
        res,
        statusCode: STATUS_CODE.unauthorized,
        isAuth: false,
        message: defaultMessages.noTokenProvided,
      });
    }

    jwt.verify(token, process.env.JWT_AUTH_KEY, (err, decoded) => {
      if (err) {
        return responseHandler({
          res,
          statusCode: STATUS_CODE.success,
          isAuth: false,
          message: defaultMessages.tokenNotAuthorized,
        });
      }

      // if everything is ok, saves on the request to use later
      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    throw errorHandler(res, error);
  }
};

const generateToken = async () => {
  return jwt.sign({ userId: currentUser[0].userId }, process.env.JWT_AUTH_KEY, {
    expiresIn: process.env.JWT_EXPIRES, // expires in 20 min
  });
};

export { verifyJWT, generateToken };
