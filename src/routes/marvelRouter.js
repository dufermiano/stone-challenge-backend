import { Router } from 'express';
import { getComics, getComicsById } from '../controllers';

// Importing middleware function that authorizes the request
import { verifyJWT } from '../utils/jwt';

const marvelApiRouter = Router();

// Marvel API Router

// comics API
marvelApiRouter.get('/marvel/comics', verifyJWT, getComics);
marvelApiRouter.get('/marvel/comics/:comicId', verifyJWT, getComicsById);

// characters API
// marvelApiRouter.get('/marvel/characters', verifyJWT, getComics);
// marvelApiRouter.get(
//   '/marvel/characters/:characterId',
//   verifyJWT,
//   getComicsById
// );

export default marvelApiRouter;
