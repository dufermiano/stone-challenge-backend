import serverless from 'serverless-http';
import express from 'express';
import mainRouter from './src/routes/mainRouter';

const app = express();

app.use(mainRouter);

exports.handler = serverless(app);
