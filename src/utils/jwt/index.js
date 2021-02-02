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
        message: defaultMessages.token.notProvided,
      });
    }

    jwt.verify(token, process.env.JWT_AUTH_KEY, (err, decoded) => {
      if (err) {
        return responseHandler({
          res,
          message: defaultMessages.token.notAuthorized,
          statusCode: STATUS_CODE.unauthorized,
          isAuth: false,
        });
      }

      // if everything is ok, saves on the request to use later
      req.userId = decoded.userId;
      next();
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

const generateToken = async (userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_AUTH_KEY, {
      expiresIn: process.env.JWT_EXPIRES, // expires in 1 hour
    });

    return token;
  } catch (error) {
    throw error;
  }
};

export { verifyJWT, generateToken };
