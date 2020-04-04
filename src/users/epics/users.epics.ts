import { isOfType } from 'typesafe-actions';
import { combineEpics, Epic } from 'redux-observable';
import {
    debounceTime,
    map,
    filter,
    withLatestFrom,
    switchMap,
    tap,
} from 'rxjs/operators';

import { RootState } from 'common/reducers';
import { container } from 'common/services/injection.service';

import * as UsersActions from '../actions/users.actions';
import { getSearchPhrase, getSelectedUser } from '../selectors/users.selectors';
import { UsersService } from '../services/users.service';

type TriggerSearchUserEpic = Epic<UsersActions.USER_ACTIONS>;
const triggerSearchUser: TriggerSearchUserEpic = (action$) =>
    action$.pipe(
        filter(isOfType(UsersActions.SET_SEARCH_USER_PHRASE)),
        debounceTime(300),
        filter(({ payload }) => payload.length > 3),
        map(() => UsersActions.searchUser.request())
    );

type SearchUserEpic = Epic<
    UsersActions.USER_ACTIONS,
    UsersActions.USER_ACTIONS,
    RootState
>;
const searchUser: SearchUserEpic = (action$, state$) =>
    action$.pipe(
        filter(isOfType(UsersActions.SEARCH_USER_REQUEST)),
        withLatestFrom(state$.pipe(map(getSearchPhrase))),
        switchMap(([_action, phrase]) =>
            container.resolve<UsersService>('usersService').usersSearch(phrase)
        ),
        map((result) =>
            typeof result === 'string'
                ? UsersActions.searchUser.failure(result)
                : UsersActions.searchUser.success(result)
        )
    );

type SelectUserEpic = Epic<UsersActions.USER_ACTIONS>;
const selectUser: SelectUserEpic = (action$) =>
    action$.pipe(
        filter(isOfType(UsersActions.SELECT_USER)),
        debounceTime(100),
        filter(({ payload }) => !!payload),
        switchMap(() => [
            UsersActions.fetchBiography.request(),
            UsersActions.fetchRepositories.request(),
        ])
    );

type FetchBiographyEpic = Epic<
    UsersActions.USER_ACTIONS,
    UsersActions.USER_ACTIONS,
    RootState
>;
const biographyFetch: FetchBiographyEpic = (action$, state$) =>
    action$.pipe(
        filter(isOfType(UsersActions.USER_BIO_REQUEST)),
        withLatestFrom(state$.pipe(map(getSelectedUser))),
        filter(([_action, user]) => !!user),
        switchMap(([_action, user]) =>
            container
                .resolve<UsersService>('usersService')
                .biographyFetch(user?.name || '')
        ),
        map((result) =>
            typeof result === 'string'
                ? UsersActions.fetchBiography.failure()
                : UsersActions.fetchBiography.success(result)
        )
    );

type FetchRepositoriesEpic = Epic<
    UsersActions.USER_ACTIONS,
    UsersActions.USER_ACTIONS,
    RootState
>;
const fetchRepositories: FetchRepositoriesEpic = (action$, state$) =>
    action$.pipe(
        filter(isOfType(UsersActions.USER_REPOSITORIES_REQUEST)),
        withLatestFrom(state$.pipe(map(getSelectedUser))),
        filter(([_action, user]) => !!user),
        switchMap(([_action, user]) =>
            container
                .resolve<UsersService>('usersService')
                .repositoriesFetch(user?.name || '')
        ),
        map((result) =>
            typeof result === 'string'
                ? UsersActions.fetchRepositories.failure(result)
                : UsersActions.fetchRepositories.success(result)
        )
    );

export const usersEpics = combineEpics(
    triggerSearchUser,
    searchUser,
    selectUser,
    biographyFetch,
    fetchRepositories
);
