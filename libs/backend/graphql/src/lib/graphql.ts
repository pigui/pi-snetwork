
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface FindUserByIdInput {
    _id: string;
}

export interface FindUserByEmailInput {
    email: string;
}

export interface CreateUserInput {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export interface LoginWithPasswordInput {
    email: string;
    password: string;
}

export interface RefreshTokensInput {
    refreshToken: string;
}

export interface User {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AccessToken {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface IQuery {
    findUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    findUserById(findUserByIdInput: FindUserByIdInput): Nullable<User> | Promise<Nullable<User>>;
    findUserByEmail(findUserByEmailInput: FindUserByEmailInput): Nullable<User> | Promise<Nullable<User>>;
    currentUser(): User | Promise<User>;
}

export interface IMutation {
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    loginWithPassword(loginWithPasswordInput: LoginWithPasswordInput): AccessToken | Promise<AccessToken>;
    refreshTokens(refreshTokensInput: RefreshTokensInput): AccessToken | Promise<AccessToken>;
}

export interface ISubscription {
    userCreated(): User | Promise<User>;
}

type Nullable<T> = T | null;
