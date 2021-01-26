'use strict';

import { connectDB } from '../../services/db';
import FavoriteDao from '../../services/FavoriteDao';

const createFavorite = async (req, res) => {
  const conn = await connectDB();

  const favoriteDao = new FavoriteDao(conn);

  const fav = req.body;

  try {
    const [currentUser] = await favoriteDao.getAll();

    if (currentUser.length > 0) {
      res.status(200).json('Favorito já existe');
      return;
    }

    fav.active = true;
    const result = await favoriteDao.save(fav);

    console.log(result);

    res.status(202).json('Favorito criado');
  } catch (error) {
    console.log(error);
    res.status(500).json('Erro');
  }
};

const activateOrDeactivateFavorite = async (req, res) => {
  const conn = await connectDB();

  const favoriteDao = new UserDao(conn);

  const userData = req.body;

  try {
    const { affectedRows } = await userDao.modify(1, userData);
    console.log(affectedRows);

    const responseString = userData.active
      ? 'Usuário ativado'
      : 'Usuário desativado';

    res.status(200).json(responseString);
  } catch (error) {
    console.log(error);
    res.status(500).json('Erro');
  }
};

const updateFavorite = async (req, res) => {
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

export { createFavorite, updateFavorite, activateOrDeactivateFavorite };
