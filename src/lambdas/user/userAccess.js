'use strict';

import { connectDB } from '../../services/db';
import UserDao from '../../services/UserDao';
import jwt from 'jsonwebtoken';

const createUser = async (req, res) => {
  const conn = await connectDB();

  const userDao = new UserDao(conn);

  const user = req.body;

  try {
    const [currentUser] = await userDao.getByUsername(user.username);

    if (currentUser.length > 0) {
      res.status(200).json('Usuario já existe');
      return;
    }

    user.active = true;
    const result = await userDao.save(user);

    console.log(result);

    res.status(202).json('Usuario criado');
  } catch (error) {
    console.log(error);
    res.status(500).json('Erro');
  }
};

const login = async (req, res) => {
  const conn = await connectDB();

  const userDao = new UserDao(conn);

  const { username, password } = req.body;

  try {
    const [currentUser] = await userDao.login(username, password);

    if (currentUser.length > 0) {
      const token = jwt.sign({ userId: currentUser[0].userId }, 'a', {
        expiresIn: 1200, // expires in 5min
      });
      return res.json({ auth: true, token: token });
    }

    res
      .status(400)
      .json({ message: 'Login inválido! Usuário ou senha inválidos' });
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
};

const logout = (req, res) => {
  res.json({ auth: false, token: null });
};

const updateUser = async (req, res) => {
  const conn = await connectDB();

  const userDao = new UserDao(conn);

  const userData = req.body;

  try {
    const { affectedRows } = await userDao.modify(1, userData);
    console.log(affectedRows);

    res.status(200).json('Usuario alterado');
  } catch (error) {
    console.log(error);
    res.status(500).json('Erro');
  }
};

export { login, logout, createUser, updateUser };
