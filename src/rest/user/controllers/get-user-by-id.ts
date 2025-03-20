import { Request, Response } from 'express';
import { Usecases } from '../../../usecases';
import { AppContext } from '../../../libs/context';
import { UserDTO } from '../dtos/user';
import { toUserDTO } from '../mappers/user';

export const initGetUserByIdController = (usecases: Usecases) => {
  return async (req: Request, res: Response<UserDTO>) => {
    const user = await usecases.user.getById(
      req.context as AppContext,
      req.params.id,
    );
    const userDTO = toUserDTO(user);

    res.json(userDTO);
  };
};
