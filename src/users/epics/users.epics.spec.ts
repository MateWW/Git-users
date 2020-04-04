import { of, BehaviorSubject } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { ActionsObservable, StateObservable } from 'redux-observable';

import { RootState } from 'common/reducers';
import { container } from 'common/services/injection.service';

import * as UserActions from '../actions/users.actions';
import { defaultState, UsersState } from '../reducers/users.reducer';
import { UsersService } from '../services/users.service';
import { user, biography, repositories } from './users.epics.mock.json';
import * as Epics from './users.epics';

const getTestScheduler = () =>
    new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });

const createStoreState = (data?: Partial<UsersState>) => ({
    users: {
        ...defaultState,
        ...data,
    },
});

describe('users/epics/users.epics.ts', () => {
    const stateSubject = new BehaviorSubject<RootState>(createStoreState());
    const state$ = new StateObservable(stateSubject, { users: defaultState });

    test('should trigger search users request', () =>
        getTestScheduler().run(({ hot, expectObservable }) => {
            const action$ = hot('--a', {
                a: UserActions.setSearchPhrase('MockName'),
            });
            const output$ = Epics.usersEpics(
                new ActionsObservable(action$),
                state$,
                null
            );
            const expectedRequest = UserActions.searchUser.request();

            expectObservable(output$).toBe(' 300ms --a', {
                a: expectedRequest,
            });
        }));

    test('should successfully find users', () =>
        getTestScheduler().run(({ hot, expectObservable }) => {
            const usersService = container.resolve<UsersService>(
                'usersService'
            );
            jest.spyOn(usersService, 'usersSearch').mockReturnValue(of([]));
            stateSubject.next(
                createStoreState({ searchUserPhrase: 'MockName' })
            );

            const action$ = hot('-a', { a: UserActions.searchUser.request() });
            const output$ = Epics.usersEpics(
                new ActionsObservable(action$),
                state$,
                null
            );
            const expectedResult = UserActions.searchUser.success([]);

            expectObservable(output$).toBe('-a', {
                a: expectedResult,
            });
        }));

    test('should fail durring users search', () =>
        getTestScheduler().run(({ hot, expectObservable }) => {
            const usersService = container.resolve<UsersService>(
                'usersService'
            );
            const errorMessage = 'Some error message';
            jest.spyOn(usersService, 'usersSearch').mockReturnValue(
                of(errorMessage)
            );
            stateSubject.next(
                createStoreState({ searchUserPhrase: 'MockName' })
            );

            const action$ = hot('-a', { a: UserActions.searchUser.request() });
            const output$ = Epics.usersEpics(
                new ActionsObservable(action$),
                state$,
                null
            );
            const expectedResult = UserActions.searchUser.failure(errorMessage);

            expectObservable(output$).toBe('-a', {
                a: expectedResult,
            });
        }));

    test('should trigger fetch user details when user selected', () =>
        getTestScheduler().run(({ hot, expectObservable }) => {
            const action$ = hot('--a', {
                a: UserActions.selectUser(user),
            });
            const output$ = Epics.usersEpics(
                new ActionsObservable(action$),
                state$,
                null
            );

            expectObservable(output$).toBe(' 100ms --(ab)', {
                a: UserActions.fetchBiography.request(),
                b: UserActions.fetchRepositories.request(),
            });
        }));

    test('should successfully fetch user details', () =>
        getTestScheduler().run(({ hot, expectObservable }) => {
            const usersService = container.resolve<UsersService>(
                'usersService'
            );
            jest.spyOn(usersService, 'biographyFetch').mockReturnValue(
                of(biography)
            );
            stateSubject.next(createStoreState({ selectedUser: user }));

            const action$ = hot('-a', {
                a: UserActions.fetchBiography.request(),
            });
            const output$ = Epics.usersEpics(
                new ActionsObservable(action$),
                state$,
                null
            );
            const expectedResult = UserActions.fetchBiography.success(
                biography
            );

            expectObservable(output$).toBe('-a', {
                a: expectedResult,
            });
        }));

    test('should failed user details fetching', () =>
        getTestScheduler().run(({ hot, expectObservable }) => {
            const usersService = container.resolve<UsersService>(
                'usersService'
            );
            jest.spyOn(usersService, 'biographyFetch').mockReturnValue(
                of('Some error message')
            );
            stateSubject.next(createStoreState({ selectedUser: user }));

            const action$ = hot('-a', {
                a: UserActions.fetchBiography.request(),
            });
            const output$ = Epics.usersEpics(
                new ActionsObservable(action$),
                state$,
                null
            );

            const expectedResult = UserActions.fetchBiography.failure();
            expectObservable(output$).toBe('-a', {
                a: expectedResult,
            });
        }));

    test('should succeed user repositories fetching', () =>
        getTestScheduler().run(({ hot, expectObservable }) => {
            const usersService = container.resolve<UsersService>(
                'usersService'
            );
            jest.spyOn(usersService, 'repositoriesFetch').mockReturnValue(
                of(repositories)
            );
            stateSubject.next(createStoreState({ selectedUser: user }));

            const action$ = hot('-a', {
                a: UserActions.fetchRepositories.request(),
            });
            const output$ = Epics.usersEpics(
                new ActionsObservable(action$),
                state$,
                null
            );

            const expectedResult = UserActions.fetchRepositories.success(
                repositories
            );
            expectObservable(output$).toBe('-a', {
                a: expectedResult,
            });
        }));

    test('should failed user details fetching', () =>
        getTestScheduler().run(({ hot, expectObservable }) => {
            const usersService = container.resolve<UsersService>(
                'usersService'
            );
            const message = 'Some error message';
            jest.spyOn(usersService, 'repositoriesFetch').mockReturnValue(
                of(message)
            );
            stateSubject.next(createStoreState({ selectedUser: user }));

            const action$ = hot('-a', {
                a: UserActions.fetchRepositories.request(),
            });
            const output$ = Epics.usersEpics(
                new ActionsObservable(action$),
                state$,
                null
            );

            const expectedResult = UserActions.fetchRepositories.failure(
                message
            );
            expectObservable(output$).toBe('-a', {
                a: expectedResult,
            });
        }));
});
