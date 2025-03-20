import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
import { UserEntity } from '../../entities/user/user';
import { MeEntity } from '../../entities/auth/me';
import { AuthTokensEntity } from '../../entities/auth/auth-tokens';
import { AppContext } from '../../libs/context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  Email: { input: any; output: any };
};

export type AuthTokens = {
  __typename?: 'AuthTokens';
  accessToken: Scalars['String']['output'];
  expiredAt: Scalars['DateTime']['output'];
  refreshToken: Scalars['String']['output'];
};

export type CreateUserInput = {
  email: Scalars['Email']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type ImpersonateUserInput = {
  refreshToken: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type Me = {
  __typename?: 'Me';
  email: Scalars['Email']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  impersonateUser: AuthTokens;
  refreshToken: AuthTokens;
  signIn: AuthTokens;
  stopImpersonatingUser: AuthTokens;
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationImpersonateUserArgs = {
  input: ImpersonateUserInput;
};

export type MutationRefreshTokenArgs = {
  input: RefreshTokenInput;
};

export type MutationSignInArgs = {
  input: SignInInput;
};

export type MutationStopImpersonatingUserArgs = {
  input: StopImpersonatingUserInput;
};

export type Query = {
  __typename?: 'Query';
  me: Me;
  user: User;
  users: Array<User>;
};

export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type RefreshTokenInput = {
  refreshToken: Scalars['String']['input'];
};

export type SignInInput = {
  email: Scalars['Email']['input'];
  password: Scalars['String']['input'];
};

export type StopImpersonatingUserInput = {
  refreshToken: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['Email']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AuthTokens: ResolverTypeWrapper<AuthTokensEntity>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateUserInput: CreateUserInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Email: ResolverTypeWrapper<Scalars['Email']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  ImpersonateUserInput: ImpersonateUserInput;
  Me: ResolverTypeWrapper<MeEntity>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RefreshTokenInput: RefreshTokenInput;
  SignInInput: SignInInput;
  StopImpersonatingUserInput: StopImpersonatingUserInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<UserEntity>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AuthTokens: AuthTokensEntity;
  Boolean: Scalars['Boolean']['output'];
  CreateUserInput: CreateUserInput;
  DateTime: Scalars['DateTime']['output'];
  Email: Scalars['Email']['output'];
  ID: Scalars['ID']['output'];
  ImpersonateUserInput: ImpersonateUserInput;
  Me: MeEntity;
  Mutation: {};
  Query: {};
  RefreshTokenInput: RefreshTokenInput;
  SignInInput: SignInInput;
  StopImpersonatingUserInput: StopImpersonatingUserInput;
  String: Scalars['String']['output'];
  User: UserEntity;
}>;

export type AuthTokensResolvers<
  ContextType = AppContext,
  ParentType extends
    ResolversParentTypes['AuthTokens'] = ResolversParentTypes['AuthTokens'],
> = ResolversObject<{
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expiredAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface EmailScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Email'], any> {
  name: 'Email';
}

export type MeResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes['Me'] = ResolversParentTypes['Me'],
> = ResolversObject<{
  email?: Resolver<ResolversTypes['Email'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<
  ContextType = AppContext,
  ParentType extends
    ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = ResolversObject<{
  createUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, 'input'>
  >;
  impersonateUser?: Resolver<
    ResolversTypes['AuthTokens'],
    ParentType,
    ContextType,
    RequireFields<MutationImpersonateUserArgs, 'input'>
  >;
  refreshToken?: Resolver<
    ResolversTypes['AuthTokens'],
    ParentType,
    ContextType,
    RequireFields<MutationRefreshTokenArgs, 'input'>
  >;
  signIn?: Resolver<
    ResolversTypes['AuthTokens'],
    ParentType,
    ContextType,
    RequireFields<MutationSignInArgs, 'input'>
  >;
  stopImpersonatingUser?: Resolver<
    ResolversTypes['AuthTokens'],
    ParentType,
    ContextType,
    RequireFields<MutationStopImpersonatingUserArgs, 'input'>
  >;
}>;

export type QueryResolvers<
  ContextType = AppContext,
  ParentType extends
    ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = ResolversObject<{
  me?: Resolver<ResolversTypes['Me'], ParentType, ContextType>;
  user?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, 'id'>
  >;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
}>;

export type UserResolvers<
  ContextType = AppContext,
  ParentType extends
    ResolversParentTypes['User'] = ResolversParentTypes['User'],
> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['Email'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = AppContext> = ResolversObject<{
  AuthTokens?: AuthTokensResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Email?: GraphQLScalarType;
  Me?: MeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;
