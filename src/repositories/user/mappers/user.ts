import { Selectable } from 'kysely';
import { Users } from '../../database/models';
import { UserEntity } from '../../../entities/user/user';

export const toUserEntity = (model: Selectable<Users>): UserEntity => {
  return {
    id: model.id,
    createdAt: model.created_at,
    updatedAt: model.updated_at,
    deletedAt: model.deleted_at,
    firstName: model.first_name,
    lastName: model.last_name,
    email: model.email,
    isAdmin: model.is_admin,
    externalId: model.external_id,
  };
};

export const toUserEntities = (models: Selectable<Users>[]): UserEntity[] => {
  return models.map(toUserEntity);
};
