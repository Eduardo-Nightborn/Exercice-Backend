import { MeEntity } from '../../../entities/auth/me';
import { MeDTO } from '../dtos/me';

export const toMeDTO = (me: MeEntity): MeDTO => {
  return {
    id: me.id,
    email: me.email,
    firstName: me.firstName,
    lastName: me.lastName,
  };
};
