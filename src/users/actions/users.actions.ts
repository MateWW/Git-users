import { action, createAsyncAction, ActionType } from 'typesafe-actions';

import { User } from '../models/user';
import { Repository } from '../models/repository';

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

export const USER_REPOSITORIES_REQUEST = 'USER_REPOSITORIES_REQUEST';
export const USER_REPOSITORIES_SUCCESS = 'USER_REPOSITORIES_SUCCESS';
export const USER_REPOSITORIES_FAILURE = 'USER_REPOSITORIES_FAILURE';
export const fetchRepositories = createAsyncAction(
    USER_REPOSITORIES_REQUEST,
    USER_REPOSITORIES_SUCCESS,
    USER_REPOSITORIES_FAILURE
)<never, Repository[], string>();

export const userActions = {
    setSearchPhrase,
    searchUser,
    selectUser,
    fetchRepositories,
};
export type USER_ACTIONS = ActionType<typeof userActions>;
