import { Router } from 'express';
import {} from '../lambdas';

// Importing middleware function that authorizes the request
import { verifyJWT } from '../utils/jwt';

const marvelApiRouter = Router();

// Marvel API Router
marvelApiRouter.post('/marvel/create-favorite/:userId', verifyJWT);

export default marvelApiRouter;
