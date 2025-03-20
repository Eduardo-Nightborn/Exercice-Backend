import { faker } from '@faker-js/faker';
import { Insertable, Selectable, Updateable } from 'kysely';
import { Users } from '../../models';

export const dbUserFixtures = {
  select: (user?: Partial<Selectable<Users>>): Selectable<Users> => {
    return {
      id: faker.string.uuid(),
      created_at: faker.date.past(),
      updated_at: faker.date.past(),
      deleted_at: null,
      external_id: faker.string.uuid(),
      email: faker.internet.email(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      is_admin: false,
      ...user,
    };
  },
  create: (user?: Partial<Insertable<Users>>): Insertable<Users> => {
    return {
      id: faker.string.uuid(),
      external_id: faker.string.uuid(),
      email: faker.internet.email(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      is_admin: false,
      ...user,
    };
  },
  update: (user?: Partial<Updateable<Users>>): Updateable<Users> => {
    return {
      id: faker.string.uuid(),
      updated_at: new Date(),
      external_id: faker.string.uuid(),
      email: faker.internet.email(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      is_admin: false,
      ...user,
    };
  },
};
