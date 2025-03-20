import { BusinessError } from './business-error';
import { ErrorCode } from './error-code';

export class BadRequestError extends BusinessError {
  constructor(message: string, args?: object, stack?: string) {
    super(message, ErrorCode.BAD_REQUEST, 400, args, stack);
    this.name = this.constructor.name;
  }
}
