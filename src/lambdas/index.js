import hello from './hello';
import hello2 from './hello2';
import {
  login,
  logout,
  createUser,
  updateUser,
  activateOrDeactivateUser,
} from './user/userAccess';

import {
  createFavorite,
  updateFavorite,
  activateOrDeactivateFavorite,
} from './user/favoriteAccess';

export {
  hello,
  hello2,
  login,
  logout,
  createUser,
  updateUser,
  activateOrDeactivateUser,
  createFavorite,
  updateFavorite,
  activateOrDeactivateFavorite,
};
