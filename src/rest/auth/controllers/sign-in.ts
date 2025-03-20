import { Request, Response } from 'express';
import { Usecases } from '../../../usecases';
import { AppContext } from '../../../libs/context';
import { AuthTokensDTO } from '../dtos/auth-tokens';
import { SignInInputDTO } from '../dtos/sign-in-input';
import { toAuthTokensDTO } from '../mappers/auth-tokens';

export const initSignInController = (usecases: Usecases) => {
  return async (
    req: Request<any, AuthTokensDTO, SignInInputDTO>,
    res: Response<AuthTokensDTO>,
  ) => {
    const tokens = await usecases.auth.signIn(req.context as AppContext, {
      email: req.body.email,
      password: req.body.password,
    });
    const tokensDTO = toAuthTokensDTO(tokens);

    res.json(tokensDTO);
  };
};
