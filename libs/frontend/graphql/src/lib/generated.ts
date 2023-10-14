import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
import * as ApolloCore from '@apollo/client/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: Date; output: Date; }
};

export type AccessToken = {
  __typename?: 'AccessToken';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user: User;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type FindUserByEmailInput = {
  email: Scalars['String']['input'];
};

export type FindUserByIdInput = {
  _id: Scalars['ID']['input'];
};

export type LoginWithPasswordInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  loginWithPassword: AccessToken;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationLoginWithPasswordArgs = {
  loginWithPasswordInput?: InputMaybe<LoginWithPasswordInput>;
};

export type Query = {
  __typename?: 'Query';
  findUserByEmail?: Maybe<User>;
  findUserById?: Maybe<User>;
  findUsers?: Maybe<Array<Maybe<User>>>;
};


export type QueryFindUserByEmailArgs = {
  findUserByEmailInput: FindUserByEmailInput;
};


export type QueryFindUserByIdArgs = {
  findUserByIdInput: FindUserByIdInput;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type LoginWithPasswordMutationVariables = Exact<{
  loginWithPasswordInput: LoginWithPasswordInput;
}>;


export type LoginWithPasswordMutation = { __typename?: 'Mutation', loginWithPassword: { __typename?: 'AccessToken', accessToken: string, refreshToken: string, user: { __typename?: 'User', _id: string, email: string, firstName: string, lastName: string, createdAt: Date, updatedAt: Date } } };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', _id: string, email: string, firstName: string, lastName: string, createdAt: Date, updatedAt: Date } };

export const LoginWithPasswordDocument = gql`
    mutation LoginWithPassword($loginWithPasswordInput: LoginWithPasswordInput!) {
  loginWithPassword(loginWithPasswordInput: $loginWithPasswordInput) {
    accessToken
    refreshToken
    user {
      _id
      email
      firstName
      lastName
      createdAt
      updatedAt
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginWithPasswordGQL extends Apollo.Mutation<LoginWithPasswordMutation, LoginWithPasswordMutationVariables> {
    override document = LoginWithPasswordDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateUserDocument = gql`
    mutation CreateUser($createUserInput: CreateUserInput!) {
  createUser(createUserInput: $createUserInput) {
    _id
    email
    firstName
    lastName
    createdAt
    updatedAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateUserGQL extends Apollo.Mutation<CreateUserMutation, CreateUserMutationVariables> {
    override document = CreateUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }

  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  interface MutationOptionsAlone<T, V> extends Omit<ApolloCore.MutationOptions<T, V>, 'mutation' | 'variables'> {}

  @Injectable()
  export class ApolloAngularSDK {
    constructor(
      private loginWithPasswordGql: LoginWithPasswordGQL,
      private createUserGql: CreateUserGQL
    ) {}
      
    loginWithPassword(variables: LoginWithPasswordMutationVariables, options?: MutationOptionsAlone<LoginWithPasswordMutation, LoginWithPasswordMutationVariables>) {
      return this.loginWithPasswordGql.mutate(variables, options)
    }
    
    createUser(variables: CreateUserMutationVariables, options?: MutationOptionsAlone<CreateUserMutation, CreateUserMutationVariables>) {
      return this.createUserGql.mutate(variables, options)
    }
  }