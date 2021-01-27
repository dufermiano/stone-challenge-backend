import { Router } from 'express';
import {
  login,
  logout,
  createUser,
  activateOrDeactivateUser,
  updateUser,
  getUserById,
} from '../controllers';

// Importing middleware function that authorizes the request
import { verifyJWT } from '../utils/jwt';

const usersRouter = Router();

// User Routes
usersRouter.post('/users/create', createUser);
usersRouter.get('/users/:userId', verifyJWT, getUserById);
usersRouter.patch(
  '/users/update-user-status/:userId',
  verifyJWT,
  activateOrDeactivateUser
);
usersRouter.put('/users/update/:userId', verifyJWT, updateUser);

// Login/Logout Routes
usersRouter.post('/login', login);
usersRouter.post('/logout', logout);

export default usersRouter;
