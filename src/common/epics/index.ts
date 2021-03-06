import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { usersEpics } from 'users/epics/users.epics';

export const epicMiddleware = createEpicMiddleware();
export const rootEpic = combineEpics(usersEpics);
