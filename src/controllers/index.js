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
  activateOrDeactivateFavorite,
  listFavorites,
} from './favorites/favoriteController';

import { getComics } from './marvel/marvelController';

export {
  getComics,
  login,
  logout,
  createUser,
  updateUser,
  activateOrDeactivateUser,
  createFavorite,
  activateOrDeactivateFavorite,
  listFavorites,
  getUserById,
};
