import { faker } from '@faker-js/faker';
import { CreateUserInput } from '../../user/create-user-input';
import { WithRequired } from '../../../libs/types';
import { UserEntity } from '../../user/user';

export const userFixtures = {
  createUserInput: (input?: Partial<CreateUserInput>): CreateUserInput => {
    return {
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      password: faker.internet.password(),
      ...input,
    };
  },
  user: (user: WithRequired<UserEntity, 'id'>): UserEntity => {
    return {
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
      deletedAt: null,
      externalId: faker.string.uuid(),
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      isAdmin: false,
      ...user,
    };
  },
};
