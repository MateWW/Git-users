import { combineReducers } from 'redux';

import { usersReducer, UsersState } from 'users/reducers/users.reducer';

export const rootReducer = combineReducers({ users: usersReducer });
export interface RootState {
    users: UsersState;
}
