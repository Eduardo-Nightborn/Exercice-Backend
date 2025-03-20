export type UserEntity = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  externalId: string;
};
