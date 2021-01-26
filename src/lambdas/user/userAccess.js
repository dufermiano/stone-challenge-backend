'use strict';

import { connectDB } from '../../services/db';
import UserDao from '../../services/UserDao';
import { encrypt } from '../../utils/crypto';
import jwt from 'jsonwebtoken';

const createUser = async (req, res) => {
  const conn = await connectDB();

  const userDao = new UserDao(conn);

  const user = req.body;

  try {
    const [currentUser] = await userDao.getByUsername(user.username);

    if (currentUser.length > 0) {
      return res.status(200).json('Usuario já existe');
    }

    user.active = true;
    const encryptedPass = encrypt(user.password);
    user.password = encryptedPass;
    await userDao.save(user);

    return res.status(202).json('Usuario criado');
  } catch (error) {
    console.log(error);
    return res.status(500).json('Erro');
  }
};

const login = async (req, res) => {
  const conn = await connectDB();

  const userDao = new UserDao(conn);

  const { username, password } = req.body;

  const encryptedPass = encrypt(password);

  try {
    const [currentUser] = await userDao.login(username, encryptedPass);

    if (currentUser.length > 0) {
      const token = jwt.sign({ userId: currentUser[0].userId }, 'a', {
        expiresIn: 1200, // expires in 5min
      });
      return res.json({ auth: true, token: token });
    }

    return res
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

    return res.status(200).json('Usuario alterado');
  } catch (error) {
    console.log(error);
    return res.status(500).json('Erro');
  }
};

const activateOrDeactivateUser = async (req, res) => {
  const conn = await connectDB();

  const userDao = new UserDao(conn);

  const userData = req.body;

  try {
    const { affectedRows } = await userDao.modify(1, userData);
    console.log(affectedRows);

    if (affectedRows > 0) {
      const responseString = userData.active
        ? 'Usuário ativado'
        : 'Usuário desativado';

      return res
        .status(200)
        .json({ message: responseString, modified: userData.active });
    }

    return res.status(200).json('Usuário não encontrado');
  } catch (error) {
    console.log(error);
    res.status(500).json('Erro');
  }
};

export { login, logout, createUser, updateUser, activateOrDeactivateUser };
