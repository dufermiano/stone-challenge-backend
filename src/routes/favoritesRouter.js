import { Router } from 'express';
import {
  listFavorites,
  createFavorite,
  activateOrDeactivateFavorite,
} from '../controllers';

// Importing middleware function that authorizes the request
import { verifyJWT } from '../utils/jwt';

const favoritesRouter = Router();

// Favorite Routes
favoritesRouter.post(
  '/favorites/create-favorite/:userId',
  verifyJWT,
  createFavorite
);
favoritesRouter.get('/favorites/:userId', verifyJWT, listFavorites);
favoritesRouter.get(
  '/favorites/change-status/:userId',
  verifyJWT,
  activateOrDeactivateFavorite
);

export default favoritesRouter;
