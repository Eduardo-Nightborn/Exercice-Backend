// src/usecases/user/create-user.test.ts
// import { BadRequestError } from '../../entities/errors/bad-request-error';
// import { tests } from '../../libs/tests';
// import { Setup } from '../../libs/tests/setup/setup';

// describe('createUser', () => {
//   const { fixtures } = tests;

//   let setup: Setup;

//   beforeAll(async () => {
//     setup = await tests.setup();
//   });

//   afterAll(async () => {
//     await setup.onStop();
//   });

//   it('should create a user', async () => {
//     const ctx = setup.context({
//       isAuthenticated: false,
//     });

//     const input = fixtures.entities.user.createUserInput();

//     const user = await setup.usecases.user.create(ctx, input);

//     expect(user).toMatchObject({
//       id: expect.any(String),
//       externalId: expect.any(String),
//       email: input.email,
//       firstName: input.firstName,
//       lastName: input.lastName,
//     });
//   });

//   it('should throw a BadRequestError if the user already exists', async () => {
//     const ctx = setup.context({
//       isAuthenticated: false,
//     });
//     const input = fixtures.entities.user.createUserInput();
//     const existingUser = fixtures.db.user.create({
//       email: input.email,
//     });
//     await setup.db.insertInto('users').values(existingUser).execute();

//     await expect(setup.usecases.user.create(ctx, input)).rejects.toThrow(
//       new BadRequestError('User already exists', { email: input.email }),
//     );
//   });
// });
