import { Router } from 'express';
import {
  getComics,
  getComicsById,
  getCharacters,
  getCharactersById,
} from '../controllers';

// Importing middleware function that authorizes the request
import { verifyJWT } from '../utils/jwt';

const marvelApiRouter = Router();

// Marvel API Router

// comics API
marvelApiRouter.get('/marvel/comics', verifyJWT, getComics);
marvelApiRouter.get('/marvel/comics/:comicId', verifyJWT, getComicsById);

// characters API
marvelApiRouter.get('/marvel/characters', verifyJWT, getCharacters);
marvelApiRouter.get(
  '/marvel/characters/:characterId',
  verifyJWT,
  getCharactersById
);

export default marvelApiRouter;
