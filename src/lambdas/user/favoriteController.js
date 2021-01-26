'use strict';

import { connectDB } from '../../services/db';
import FavoriteDao from '../../services/FavoriteDao';

const createFavorite = async (req, res) => {
  const conn = await connectDB();

  const favoriteDao = new FavoriteDao(conn);

  const favData = req.body;
  const { userId } = req.params;

  try {
    for (let x in favData) {
      if (favData[x] === null) {
        delete favData[x];
      }
    }

    const [favorites] = await favoriteDao.getByAllById(userId, favData);

    if (favorites.length > 0) {
      return res
        .status(200)
        .json({ message: 'Favorito já existe', created: false });
    }

    favData.active = true;
    favData.userId = userId;
    await favoriteDao.save(favData);

    return res.status(202).json({ message: 'Favorito criado', created: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json('Internal Server Error');
  }
};

const activateOrDeactivateFavorite = async (req, res) => {
  const conn = await connectDB();

  const favoriteDao = new UserDao(conn);

  const favData = req.body;
  const { userId } = req.params;

  try {
    const { affectedRows } = await favoriteDao.modify(userId, favData);

    if (affectedRows > 0) {
      const responseString = favData.active
        ? 'Favorito ativado'
        : 'Favorito desativado';

      return res
        .status(200)
        .json({ message: responseString, modified: favData.active });
    }

    return res.status(200).json('Favorito não encontrado');
  } catch (error) {
    console.log(error);
    return res.status(500).json('Internal Server Error');
  }
};

const listFavorites = async (req, res) => {
  const conn = await connectDB();

  const favoriteDao = new FavoriteDao(conn);

  const { userId } = req.params;

  try {
    const [favorites] = await favoriteDao.getAllByUserId(userId);

    if (favorites.length === 0) {
      return res
        .status(200)
        .json({ status: 'sem favoritos cadastrados', favorites: null });
    }

    return res.status(200).json({ status: 'ok', favorites });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'Internal Server Error' });
  }
};

export { createFavorite, activateOrDeactivateFavorite, listFavorites };
