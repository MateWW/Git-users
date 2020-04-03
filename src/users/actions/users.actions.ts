import { action, createAsyncAction, ActionType } from 'typesafe-actions';

import { User } from '../models/user';
import { Repository } from '../models/repository';
import { Biography } from '../models/biography';

export const SET_SEARCH_USER_PHRASE = 'SET_SEARCH_USER_PHRASE';
export const setSearchPhrase = (phrase: string) =>
    action(SET_SEARCH_USER_PHRASE, phrase);

export const SEARCH_USER_REQUEST = 'SEARCH_USER_REQUEST';
export const SEARCH_USER_SUCCESS = 'SEARCH_USER_SUCCESS';
export const SEARCH_USER_FAILURE = 'SEARCH_USER_FAILURE';
export const searchUser = createAsyncAction(
    SEARCH_USER_REQUEST,
    SEARCH_USER_SUCCESS,
    SEARCH_USER_FAILURE
)<undefined, User[], string>();

export const SELECT_USER = 'SELECT_USER';
export const selectUser = (user: User) => action(SELECT_USER, user);

export const USER_BIO_REQUEST = 'USER_BIO_REQUEST';
export const USER_BIO_SUCCESS = 'USER_BIO_SUCCESS';
export const USER_BIO_FAILURE = 'USER_BIO_FAILURE';
export const fetchBiography = createAsyncAction(
    USER_BIO_REQUEST,
    USER_BIO_SUCCESS,
    USER_BIO_FAILURE
)<undefined, Biography, undefined>();

export const USER_REPOSITORIES_REQUEST = 'USER_REPOSITORIES_REQUEST';
export const USER_REPOSITORIES_SUCCESS = 'USER_REPOSITORIES_SUCCESS';
export const USER_REPOSITORIES_FAILURE = 'USER_REPOSITORIES_FAILURE';
export const fetchRepositories = createAsyncAction(
    USER_REPOSITORIES_REQUEST,
    USER_REPOSITORIES_SUCCESS,
    USER_REPOSITORIES_FAILURE
)<undefined, Repository[], string>();

export const userActions = {
    setSearchPhrase,
    searchUser,
    selectUser,
    fetchBiography,
    fetchRepositories,
};
export type USER_ACTIONS = ActionType<typeof userActions>;
