import { Request, Response } from 'express';
import { Usecases } from '../../../usecases';
import { AppContext } from '../../../libs/context';
import { UserDTO } from '../dtos/user';
import { toUserDTO } from '../mappers/user';
import { CreateUserInputDTO } from '../dtos/create-user-input';

export const initCreateUserController = (usecases: Usecases) => {
  return async (
    req: Request<any, UserDTO, CreateUserInputDTO>,
    res: Response<UserDTO>,
  ) => {
    const user = await usecases.user.create(req.context as AppContext, {
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    const userDTO = toUserDTO(user);

    res.json(userDTO);
  };
};
