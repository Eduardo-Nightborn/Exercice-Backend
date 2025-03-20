import { Usecases } from '../../../usecases';
import { MeResolvers } from '../../__generated__/resolvers-types';

export const initMeResolvers = (usecases: Usecases): MeResolvers => ({
  id: (parent) => {
    return parent.id;
  },
  email: (parent) => {
    return parent.email;
  },
  firstName: (parent) => {
    return parent.firstName;
  },
  lastName: (parent) => {
    return parent.lastName;
  },
});
