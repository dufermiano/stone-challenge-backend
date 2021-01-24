import { Router } from 'express';
import { hello, hello2 } from '../lambdas';

const mainRouter = Router();

mainRouter.get('/hello', hello);
mainRouter.get('/hello2', hello2);

export default mainRouter;
