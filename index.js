import serverless from 'serverless-http';
import express from 'express';
import mainRouter from './src/routes/mainRouter';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(mainRouter);

exports.handler = serverless(app);
