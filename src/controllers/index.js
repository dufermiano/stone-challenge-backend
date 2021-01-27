import {
  login,
  logout,
  createUser,
  updateUser,
  activateOrDeactivateUser,
  getUserById,
} from './user/userController';

import {
  createFavorite,
  deactivateFavorite,
  listFavorites,
} from './favorites/favoriteController';

import { getComics, getComicsById } from './marvel/marvelController';

export {
  getComics,
  login,
  logout,
  createUser,
  updateUser,
  activateOrDeactivateUser,
  createFavorite,
  deactivateFavorite,
  listFavorites,
  getUserById,
  getComicsById,
};
