'use strict';

import { connectDB } from '../../services/db';
import FavoriteDao from '../../services/FavoriteDao';

const createFavorite = async (req, res) => {
  const conn = await connectDB();

  const favoriteDao = new FavoriteDao(conn);

  const favData = req.body;
  const { userId } = req.params;
  let currentField;

  try {
    for (let key in favData) {
      if (favData[key] === null) {
        delete favData[key];
      } else {
        currentField = key;
      }
    }

    const [favorites] = await favoriteDao.getAllById(userId, favData);

    // checks exactly the favorite request, and if it is repeated will not be created again

    if (favorites.length > 0 && favorites[0].active === 1) {
      return res
        .status(200)
        .json({ message: 'Favorito já existe', created: false });
    }
    // since there is a logical delete, if the combination of favorites already exists on the table
    // its status is updated to active
    else if (favorites.length > 0 && favorites[0].active === 0) {
      favData.active = true;
      delete favData[currentField];

      await favoriteDao.modify(userId, favData);
      return res
        .status(202)
        .json({ message: 'Favorito ativado', created: true });
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

const deactivateFavorite = async (req, res) => {
  const conn = await connectDB();

  const favoriteDao = new FavoriteDao(conn);

  const favData = req.body;
  const { favId } = req.params;

  try {
    const { affectedRows } = await favoriteDao.modify(favId, favData);

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
    // list all the favorites by user
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

export { createFavorite, deactivateFavorite, listFavorites };
