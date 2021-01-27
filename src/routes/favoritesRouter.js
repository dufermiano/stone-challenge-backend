import { Router } from 'express';
import {
  listFavorites,
  createFavorite,
  deactivateFavorite,
} from '../controllers';

// Importing middleware function that authorizes the request
import { verifyJWT } from '../utils/jwt';

const favoritesRouter = Router();

// Favorite Routes
favoritesRouter.post('/favorites/create/:userId', verifyJWT, createFavorite);
favoritesRouter.get('/favorites/:userId', verifyJWT, listFavorites);
favoritesRouter.put(
  '/favorites/deactivate/:favId',
  verifyJWT,
  deactivateFavorite
);

export default favoritesRouter;
