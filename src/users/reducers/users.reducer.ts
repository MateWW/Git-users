import { RequestStatus } from 'common/enums/request-status.enum';

import { User } from '../models/user';
import { Repository } from '../models/repository';
import * as actions from '../actions/users.actions';
import { Biography } from '../models/biography';

export interface UsersState {
    searchUserPhrase: string;
    searchStatus: RequestStatus;
    searchError: string;
    users: User[];
    selectedUser: User | null;
    biography: Biography | null;
    biographyStatus: RequestStatus;
    repositories: Repository[];
    repositoriesError: string;
    repositoriesStatus: RequestStatus;
}

export const defaultState: UsersState = {
    searchUserPhrase: '',
    searchStatus: RequestStatus.BEFORE,
    searchError: '',
    users: [],
    selectedUser: null,
    biography: null,
    biographyStatus: RequestStatus.BEFORE,
    repositories: [],
    repositoriesError: '',
    repositoriesStatus: RequestStatus.BEFORE,
};

export function usersReducer(
    state: UsersState = defaultState,
    action: actions.USER_ACTIONS
): UsersState {
    switch (action.type) {
        case actions.SET_SEARCH_USER_PHRASE:
            return {
                ...state,
                searchUserPhrase: action.payload,
                users: [],
            };

        case actions.SEARCH_USER_REQUEST:
            return {
                ...state,
                searchStatus: RequestStatus.PENDING,
            };

        case actions.SEARCH_USER_SUCCESS:
            return {
                ...state,
                users: action.payload,
                searchStatus: RequestStatus.SUCCEED,
            };

        case actions.SEARCH_USER_FAILURE:
            return {
                ...state,
                searchStatus: RequestStatus.FAILED,
                searchError: action.payload,
            };

        case actions.SELECT_USER:
            return {
                ...state,
                selectedUser: action.payload,
                biography: null,
            };

        case actions.USER_BIO_REQUEST:
            return {
                ...state,
                biographyStatus: RequestStatus.PENDING,
            };

        case actions.USER_BIO_SUCCESS:
            return {
                ...state,
                biographyStatus: RequestStatus.SUCCEED,
                biography: action.payload,
            };

        case actions.USER_BIO_FAILURE:
            return {
                ...state,
                biographyStatus: RequestStatus.FAILED,
                biography: null,
            };

        case actions.USER_REPOSITORIES_REQUEST:
            return {
                ...state,
                repositoriesStatus: RequestStatus.PENDING,
            };

        case actions.USER_REPOSITORIES_SUCCESS:
            return {
                ...state,
                repositoriesStatus: RequestStatus.SUCCEED,
                repositories: action.payload,
            };

        case actions.USER_REPOSITORIES_FAILURE:
            return {
                ...state,
                repositoriesStatus: RequestStatus.FAILED,
                repositoriesError: action.payload,
            };

        default:
            return state;
    }
}
