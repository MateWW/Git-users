import { RootState } from 'common/reducers';

export const getUsersState = (state: RootState) => state.users;
export const getSearchPhrase = (state: RootState) =>
    getUsersState(state).searchUserPhrase;
export const getSelectedUser = (state: RootState) =>
    getUsersState(state).selectedUser;
