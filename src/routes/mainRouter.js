import { Router } from 'express';
import {
  hello,
  hello2,
  login,
  logout,
  createUser,
  updateUser,
} from '../lambdas';
import jwt from 'jsonwebtoken';

function verifyJWT(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token)
    return res.status(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, 'a', function (err, decoded) {
    if (err)
      return res
        .status(500)
        .json({ auth: false, message: 'Failed to authenticate token.' });

    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}

const mainRouter = Router();

mainRouter.get('/hello', hello);
mainRouter.get('/hello2', hello2);

mainRouter.post('/create-user', createUser);

mainRouter.patch('/update-user', updateUser);

mainRouter.post('/login', login);

mainRouter.post('/logout', logout);

export default mainRouter;
