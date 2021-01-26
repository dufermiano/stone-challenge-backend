import hello from './hello';
import {
  login,
  logout,
  createUser,
  updateUser,
  activateOrDeactivateUser,
} from './user/userController';

import {
  createFavorite,
  activateOrDeactivateFavorite,
  listFavorites,
} from './user/favoriteController';

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
};
