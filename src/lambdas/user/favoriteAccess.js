'use strict';

import { connectDB } from '../../services/db';
import FavoriteDao from '../../services/FavoriteDao';

const createFavorite = async (req, res) => {
  const conn = await connectDB();

  const favoriteDao = new FavoriteDao(conn);

  const favData = req.body;

  try {
    for (let x in favData) {
      if (favData[x] === null) {
        delete favData[x];
      }
    }

    const [currentUser] = await favoriteDao.getAll(1, favData);

    if (currentUser.length > 0) {
      return res
        .status(200)
        .json({ message: 'Favorito já existe', created: false });
    }

    favData.active = true;
    favData.userId = 1;
    await favoriteDao.save(fav);

    return res.status(202).json({ message: 'Favorito criado', created: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json('Erro');
  }
};

const activateOrDeactivateFavorite = async (req, res) => {
  const conn = await connectDB();

  const favoriteDao = new UserDao(conn);

  const favData = req.body;

  try {
    const { affectedRows } = await favoriteDao.modify(1, favData);

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
    return res.status(500).json('Erro');
  }
};

export { createFavorite, activateOrDeactivateFavorite };
