import { RootState } from 'common/reducers';

export const getUsersState = (state: RootState) => state.users;
export const getSearchPhrase = (state: RootState) =>
    getUsersState(state).searchUserPhrase;
export const getSelectedUser = (state: RootState) =>
    getUsersState(state).selectedUser;

export const getSearchInputData = (state: RootState) => {
    const usersState = getUsersState(state);
    return {
        users: usersState.users,
        value: usersState.searchUserPhrase,
        status: usersState.searchStatus,
        error: usersState.searchError,
    };
};

export const getProfileData = (state: RootState) => {
    const usersState = getUsersState(state);

    return {
        user: usersState.selectedUser,
        biography: usersState.biography,
        biographyStatus: usersState.biographyStatus,
        repositories: usersState.repositories,
        repositoriesStatus: usersState.repositoriesStatus,
        error: usersState.repositoriesError,
    };
};
