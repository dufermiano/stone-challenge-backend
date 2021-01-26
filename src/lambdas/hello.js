'use strict';

import { getComics } from '../services/marvel';

const hello = async (req, res) => {
  const result = await getComics();

  res.json({
    message: 'This is hello',
    result,
    url: req.url,
  });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

export default hello;
