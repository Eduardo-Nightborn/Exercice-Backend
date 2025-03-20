import { initGetAllUsersController } from './get-all-users';
import { Usecases } from '../../../usecases';
import { initGetUserByIdController } from './get-user-by-id';
import { initCreateUserController } from './create-user';

export const initUserControllers = (usecases: Usecases) => ({
  getAll: initGetAllUsersController(usecases),
  getById: initGetUserByIdController(usecases),
  create: initCreateUserController(usecases),
});

export type UserControllers = ReturnType<typeof initUserControllers>;
