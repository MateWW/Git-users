import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { usersEpic } from 'users/epics/users.epics';

export const epicMiddleware = createEpicMiddleware();
export const rootEpic = combineEpics(usersEpic);
epicMiddleware.run(rootEpic);
