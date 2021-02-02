'use strict';

import { connectDB } from '../../services/db';
import UserDao from '../../services/UserDao';
import { encrypt } from '../../utils/crypto';
import { generateToken } from '../../utils/jwt';
import { STATUS_CODE, defaultMessages } from '../../utils/general/constantes';
import { errorHandler, responseHandler } from '../../utils/general';

const createUser = async (req, res) => {
  const conn = await connectDB();

  const userDao = new UserDao(conn);

  const user = req.body;

  try {
    const [currentUser] = await userDao.getByUsername(user.username);

    if (currentUser.length > 0) {
      return responseHandler({
        res,
        statusCode: STATUS_CODE.success,
        message: defaultMessages.users.exists,
        created: false,
      });
    }

    user.active = true;
    const encryptedPass = encrypt(user.password);
    user.password = encryptedPass;
    await userDao.save(user);
    return responseHandler({
      res,
      statusCode: STATUS_CODE.created,
      message: defaultMessages.users.created,
      created: true,
    });
  } catch (error) {
    throw errorHandler(res, error);
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
      const token = await generateToken();

      return responseHandler({
        res,
        statusCode: STATUS_CODE.success,
        isAuth: true,
        token,
      });
    }

    return responseHandler({
      res,
      statusCode: STATUS_CODE.badGateway,
      isAuth: false,
      message: defaultMessages.users.invalidLogin,
    });
  } catch (error) {
    throw errorHandler(res, error);
  }
};

const logout = (req, res) => {
  return responseHandler({
    res,
    statusCode: STATUS_CODE.success,
    isAuth: false,
    token: null,
  });
};

const updateUser = async (req, res) => {
  const conn = await connectDB();

  const userDao = new UserDao(conn);

  const userData = req.body;
  const { userId } = req.params;

  try {
    if (userData.hasOwnProperty('password')) {
      const encryptedPass = encrypt(userData.password);
      userData.password = encryptedPass;
    }

    const { affectedRows } = await userDao.modify(userId, userData);
    console.log('Linhas afetadas', affectedRows);

    return responseHandler({
      res,
      statusCode: STATUS_CODE.success,
      isAuth: true,
      message: defaultMessages.users.changed,
      modified: true,
    });
  } catch (error) {
    throw errorHandler(res, error);
  }
};

const activateOrDeactivateUser = async (req, res) => {
  const conn = await connectDB();

  const userDao = new UserDao(conn);

  const userData = req.body;
  const { userId } = req.params;

  try {
    const { affectedRows } = await userDao.modify(userId, userData);
    console.log(affectedRows);

    if (affectedRows > 0) {
      const responseString = userData.active
        ? 'Usuário ativado'
        : 'Usuário desativado';

      return responseHandler({
        res,
        statusCode: STATUS_CODE.success,
        isAuth: true,
        message: responseString,
        modified: userData.active,
      });
    }

    return responseHandler({
      res,
      statusCode: STATUS_CODE.success,
      isAuth: true,
      message: defaultMessages.users.notFound,
    });
  } catch (error) {
    throw errorHandler(res, error);
  }
};

const getUserById = async (req, res) => {
  const conn = await connectDB();

  const userDao = new UserDao(conn);

  const { userId } = req.params;

  try {
    const [user] = await userDao.getByUserId(userId);

    return responseHandler({
      res,
      statusCode: STATUS_CODE.success,
      isAuth: true,
      user,
    });
  } catch (error) {
    throw errorHandler(res, error);
  }
};

export {
  login,
  logout,
  createUser,
  updateUser,
  activateOrDeactivateUser,
  getUserById,
};
