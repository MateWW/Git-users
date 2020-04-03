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
    // return {
    //     user: {
    //         id: 810438,
    //         name: 'gaearon',
    //         avatar: 'https://avatars0.githubusercontent.com/u/810438?v=4',
    //         score: 1,
    //     },
    //     biography: {
    //         fullName: 'Dan Abramov',
    //         description:
    //             'Working on @reactjs. Co-author of Redux and Create React App. Building tools for humans.',
    //     },
    //     biographyStatus: 2,
    //     repositories: [
    //         {
    //             name: 'babel-plugin-react-transform',
    //             url:
    //                 'https://api.github.com/repos/gaearon/babel-plugin-react-transform',
    //             stars: 1099,
    //         },
    //         {
    //             name: 'ama',
    //             url: 'https://api.github.com/repos/gaearon/ama',
    //             stars: 219,
    //         },
    //         {
    //             name: 'base16-js',
    //             url: 'https://api.github.com/repos/gaearon/base16-js',
    //             stars: 28,
    //         },
    //     ],
    //     repositoriesStatus: 2,
    //     error: '',
    // };
};
