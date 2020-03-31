import { RequestStatus } from 'common/enums/request-status.enum';

import { User } from '../models/user';
import { Repository } from '../models/repository';
import * as actions from '../actions/users.actions';

export interface UsersState {
    searchUserPhrase: string;
    searchStatus: RequestStatus;
    searchError: string;
    users: User[];
    selectedUser: User | null;
    repositories: Repository[];
    repositoriesError: string;
    repositoriesStatus: RequestStatus;
}

const defaultState: UsersState = {
    searchUserPhrase: '',
    searchStatus: RequestStatus.BEFORE,
    searchError: '',
    users: [],
    selectedUser: null,
    repositories: [],
    repositoriesError: '',
    repositoriesStatus: RequestStatus.BEFORE,
};

export function usersReducer(
    action: actions.USER_ACTIONS,
    state: UsersState = defaultState
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
