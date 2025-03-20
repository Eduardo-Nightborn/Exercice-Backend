import { NextFunction, Request, Response } from 'express';
import { BusinessError } from '../../entities/errors/business-error';
import { Config } from '../../libs/config';

export const errorFormatterMiddleware =
  (config: Config) =>
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(err);
    }
    if (!(err instanceof Error)) {
      return next(new Error('Something went wrong'));
    }

    if (err instanceof BusinessError) {
      const errResponse: any = {
        error: {
          message: err.message,
          status: err.status,
          code: err.code,
          args: err.args,
        },
      };
      if (config.env === 'development') {
        errResponse.error.stack = err.stack;
      }
      return res.status(err.status).json(errResponse);
    }

    res.status(500).json({
      error: {
        message: err?.message,
        status: 500,
      },
    });
  };
