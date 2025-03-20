import { Request, Response } from 'express';
import { Usecases } from '../../../usecases';
import { AppContext } from '../../../libs/context';
import { MeDTO } from '../dtos/me';
import { toMeDTO } from '../mappers/me';

export const initGetMeController = (usecases: Usecases) => {
  return async (req: Request, res: Response<MeDTO>) => {
    const me = await usecases.auth.getMe(req.context as AppContext);
    const meDTO = toMeDTO(me);

    res.json(meDTO);
  };
};
