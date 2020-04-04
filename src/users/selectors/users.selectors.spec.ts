import { defaultState } from '../reducers/users.reducer';
import * as selectors from './users.selectors';

describe('/users/selectors/users.selectors.ts', () => {
    const state = { users: defaultState };
    test('getUsersState', () =>
        expect(selectors.getUsersState(state)).toEqual(defaultState));
    test('getSearchPhrase', () =>
        expect(selectors.getSearchPhrase(state)).toEqual(
            defaultState.searchUserPhrase
        ));
    test('getSelectedUser', () =>
        expect(selectors.getSelectedUser(state)).toEqual(
            defaultState.selectedUser
        ));
    test('getSearchInputData', () =>
        expect(selectors.getSearchInputData(state)).toEqual({
            users: defaultState.users,
            value: defaultState.searchUserPhrase,
            status: defaultState.searchStatus,
            error: defaultState.searchError,
        }));
    test('getProfileData', () =>
        expect(selectors.getProfileData(state)).toEqual({
            user: defaultState.selectedUser,
            biography: defaultState.biography,
            biographyStatus: defaultState.biographyStatus,
            repositories: defaultState.repositories,
            repositoriesStatus: defaultState.repositoriesStatus,
            error: defaultState.repositoriesError,
        }));
});
