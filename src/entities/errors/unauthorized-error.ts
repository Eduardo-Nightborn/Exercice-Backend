import { BusinessError } from './business-error';
import { ErrorCode } from './error-code';

export class UnauthorizedError extends BusinessError {
  constructor(message: string, args?: object, stack?: string) {
    super(message, ErrorCode.UNAUTHORIZED, 401, args, stack);
    this.name = this.constructor.name;
  }
}
