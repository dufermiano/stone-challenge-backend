'use strict';

const hello = (req, res) => {
  res.json({
    message: 'This is hello',
    url: req.url,
  });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

export default hello;
