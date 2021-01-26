import { Router } from 'express';
import { getComics } from '../controllers';

// Importing middleware function that authorizes the request
import { verifyJWT } from '../utils/jwt';

const marvelApiRouter = Router();

// Marvel API Router
marvelApiRouter.get('/marvel/comics', verifyJWT, getComics);

export default marvelApiRouter;
