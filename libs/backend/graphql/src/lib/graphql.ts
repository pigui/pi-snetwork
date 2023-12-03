
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

export interface FindPostByIdInput {
    _id: string;
}

export interface CreatePostInput {
    text: string;
}

export interface DeletePostInput {
    _id: string;
}

export interface UpdatePostInput {
    _id: string;
    text: string;
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
    findPosts(): Nullable<Nullable<Post>[]> | Promise<Nullable<Nullable<Post>[]>>;
    findPostById(findPostByIdInput: FindPostByIdInput): Nullable<Post> | Promise<Nullable<Post>>;
    findMyPost(): Nullable<Nullable<Post>[]> | Promise<Nullable<Nullable<Post>[]>>;
}

export interface IMutation {
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    loginWithPassword(loginWithPasswordInput: LoginWithPasswordInput): AccessToken | Promise<AccessToken>;
    refreshTokens(refreshTokensInput: RefreshTokensInput): AccessToken | Promise<AccessToken>;
    createPost(createPostInput: CreatePostInput): Nullable<Post> | Promise<Nullable<Post>>;
    deletePost(deletePostInput: DeletePostInput): Nullable<Post> | Promise<Nullable<Post>>;
    updatePost(updatePostInput: UpdatePostInput): Nullable<Post> | Promise<Nullable<Post>>;
}

export interface ISubscription {
    userCreated(): User | Promise<User>;
}

export interface Post {
    _id: string;
    user?: Nullable<User>;
    text: string;
    createdAt: Date;
    updatedAt: Date;
}

type Nullable<T> = T | null;
