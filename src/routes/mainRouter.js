import { Router } from 'express';
import {
  hello,
  login,
  logout,
  createUser,
  listFavorites,
  activateOrDeactivateUser,
  createFavorite,
  activateOrDeactivateFavorite,
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

// Favorite Routes
mainRouter.post('/favorites/create-favorite/:userId', createFavorite);
mainRouter.get('/favorites/:userId', listFavorites);
mainRouter.get(
  '/favorites/change-status/:userId',
  activateOrDeactivateFavorite
);

// User Routes
mainRouter.post('/user/create-user', createUser);
mainRouter.patch('/user/update-user-status/:userId', activateOrDeactivateUser);
mainRouter.put('/user/update/:userId', updateUser);

// Login/Logout Routes
mainRouter.post('/login', login);
mainRouter.post('/logout', logout);

export default mainRouter;
