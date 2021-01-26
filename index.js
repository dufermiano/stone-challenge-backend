import serverless from 'serverless-http';
import express from 'express';
import favoritesRouter from './src/routes/favoritesRouter';
import usersRouter from './src/routes/usersRouter';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favoritesRouter);
app.use(usersRouter);

exports.handler = serverless(app);
