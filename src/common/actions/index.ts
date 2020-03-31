import { USER_ACTIONS } from 'users/actions/users.actions';

import { Action as ReduxAction } from 'redux';

export type Action<T, P = undefined> = P extends undefined
    ? ReduxAction<T>
    : ActionWithPayload<T, P>;

interface ActionWithPayload<T, P> extends ReduxAction<T> {
    payload: P;
}

export type Actions = USER_ACTIONS;
