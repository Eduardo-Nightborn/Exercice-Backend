import { Request, Response } from 'express';
import { Usecases } from '../../../usecases';
import { AppContext } from '../../../libs/context';
import { UserDTO } from '../dtos/user';
import { toUserDTOs } from '../mappers/user';

export const initGetAllUsersController = (usecases: Usecases) => {
  return async (req: Request, res: Response<UserDTO[]>) => {
    const users = await usecases.user.getAll(req.context as AppContext);
    const userDTOs = toUserDTOs(users);

    res.json(userDTOs);
  };
};
