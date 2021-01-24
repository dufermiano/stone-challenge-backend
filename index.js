import serverless from 'serverless-http';
import express from 'express';
import { hello, hello2 } from './src/lambdas';
const app = express();

app.get('/hello', hello);
app.get('/hello2', hello2);

exports.handler = serverless(app);
