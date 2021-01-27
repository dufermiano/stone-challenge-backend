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

import {
  getComics,
  getComicsById,
  getCharacters,
  getCharactersById,
} from './marvel/marvelController';

export {
  getComics,
  getCharacters,
  getComicsById,
  getCharactersById,
  login,
  logout,
  createUser,
  updateUser,
  activateOrDeactivateUser,
  createFavorite,
  deactivateFavorite,
  listFavorites,
  getUserById,
};
