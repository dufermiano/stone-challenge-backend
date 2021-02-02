'use strict';

import { connectDB } from '../../services/db';
import FavoritesDao from '../../services/FavoritesDao';
import { STATUS_CODE, defaultMessages } from '../../utils/general/constantes';
import { errorHandler, responseHandler } from '../../utils/general';

const createFavorites = async (req, res) => {
  const favData = req.body;
  const { userId } = req.params;
  let currentField;

  try {
    const conn = await connectDB();
    const favoritesDao = new FavoritesDao(conn);

    for (let key in favData) {
      if (favData[key] === null) {
        delete favData[key];
      } else {
        currentField = key;
      }
    }

    const [favorites] = await favoritesDao.getAllById(userId, favData);

    // checks exactly the favorite request, and if it is repeated will not be created again

    if (favorites.length > 0 && favorites[0].active === 1) {
      return responseHandler({
        res,
        isAuth: true,
        statusCode: STATUS_CODE.success,
        message: defaultMessages.favorites.exists,
        created: false,
      });
    }
    // since there is a logical delete, if the combination of favorites already exists on the table
    // its status is updated to active
    else if (favorites.length > 0 && favorites[0].active === 0) {
      favData.active = true;
      delete favData[currentField];

      await favoritesDao.modify(userId, favData);

      return responseHandler({
        res,
        isAuth: true,
        statusCode: STATUS_CODE.success,
        message: defaultMessages.favorites.activated,
        created: true,
      });
    }

    favData.active = true;
    favData.userId = userId;
    await favoritesDao.save(favData);

    return responseHandler({
      res,
      isAuth: true,
      statusCode: STATUS_CODE.created,
      message: defaultMessages.favorites.created,
      created: true,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

const deactivateFavorites = async (req, res) => {
  const favData = req.body;
  const { favId } = req.params;

  try {
    const conn = await connectDB();

    const favoritesDao = new FavoritesDao(conn);

    const { affectedRows } = await favoritesDao.modify(favId, favData);

    if (affectedRows > 0) {
      const responseString = favData.active
        ? 'Favorito ativado'
        : 'Favorito desativado';

      return responseHandler({
        res,
        statusCode: STATUS_CODE.success,
        message: responseString,
        active: favData.active,
        modified: true,
      });
    }

    return responseHandler({
      res,
      isAuth: true,
      statusCode: STATUS_CODE.notFound,
      message: defaultMessages.favorites.notFound,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

const listFavorites = async (req, res) => {
  const { userId } = req.params;

  try {
    const conn = await connectDB();

    const favoritesDao = new FavoritesDao(conn);

    // list all the favorites by user
    const [favorites] = await favoritesDao.getAllByUserId(userId);

    if (favorites.length === 0) {
      return responseHandler({
        res,
        isAuth: true,
        statusCode: STATUS_CODE.success,
        message: defaultMessages.favorites.noFavorites,
        favorite: null,
      });
    }

    return responseHandler({
      res,
      isAuth: true,
      statusCode: STATUS_CODE.success,
      favorites,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

export { createFavorites, deactivateFavorites, listFavorites };
