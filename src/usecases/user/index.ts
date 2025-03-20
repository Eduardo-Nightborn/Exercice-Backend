import { getAllUsers } from './get-all-users';
import { createUser } from './create-user';
import { getUserById } from './get-user-by-id';

export const initUserUsecases = () => {
  return {
    getAll: getAllUsers,
    getById: getUserById,
    create: createUser,
  };
};

export type UserUsecases = ReturnType<typeof initUserUsecases>;
