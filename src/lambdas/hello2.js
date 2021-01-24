'use strict';

const hello2 = (req, res) => {
  res.json({
    message: 'This is hello2',
    url: req.url,
  });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

export default hello2;
