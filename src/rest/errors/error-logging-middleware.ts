import { NextFunction, Request, Response } from 'express';
import Logger from 'bunyan';
import { BusinessError } from '../../entities/errors/business-error';

export const errorLoggingMiddleware =
  (logger: Logger) =>
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (!(err instanceof Error)) {
      const newErr = new Error('Something went wrong');
      logger.error(newErr);
      return next(newErr);
    }

    if (err instanceof BusinessError) {
      logger.error(
        {
          error: err,
        },
        `${err.message} (code: ${err.code})`,
      );
      return next(err);
    }

    logger.error(err);
    return next(err);
  };
