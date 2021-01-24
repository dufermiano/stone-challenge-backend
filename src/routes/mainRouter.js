import { Router } from 'express';
import { hello, hello2 } from '../lambdas';
import jwt from 'jsonwebtoken';

function verifyJWT(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token)
    return res.status(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, 'a', function (err, decoded) {
    if (err)
      return res
        .status(500)
        .json({ auth: false, message: 'Failed to authenticate token.' });

    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}

const mainRouter = Router();

mainRouter.get('/hello', verifyJWT, hello);
mainRouter.get('/hello2', hello2);

mainRouter.post('/login', (req, res, next) => {
  //esse teste abaixo deve ser feito no seu banco de dados
  if (req.body.user === 'edu' && req.body.password === '123') {
    console.log(JSON.stringify(req.body));
    //auth ok
    const id = 1; //esse id viria do banco de dados
    const token = jwt.sign({ id }, 'a', {
      expiresIn: 300, // expires in 5min
    });
    return res.json({ auth: true, token: token });
  }

  res.status(500).json({ message: 'Login inválido!' });
});

mainRouter.post('/logout', function (req, res) {
  res.json({ auth: false, token: null });
});

export default mainRouter;
