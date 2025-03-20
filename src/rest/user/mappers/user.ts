import { UserEntity } from '../../../entities/user/user';
import { UserDTO } from '../dtos/user';

export const toUserDTO = (user: UserEntity): UserDTO => {
  return {
    id: user.id,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};

export const toUserDTOs = (users: UserEntity[]): UserDTO[] => {
  return users.map(toUserDTO);
};
