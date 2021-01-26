import hello from './hello';
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

export {
  hello,
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
