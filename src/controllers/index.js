import {
  login,
  logout,
  createUser,
  updateUser,
  activateOrDeactivateUser,
  getUserById,
} from './user/userController';

import {
  createFavorites,
  deactivateFavorites,
  listFavorites,
} from './favorites/favoritesController';

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
  createFavorites,
  deactivateFavorites,
  listFavorites,
  getUserById,
};
