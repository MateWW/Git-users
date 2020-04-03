import { createStore, applyMiddleware, Store, compose } from 'redux';
import { asClass, asValue } from 'awilix';

import { container } from 'common/services/injection.service';
import { UsersService } from 'users/services/users.service';

import { rootReducer } from '../reducers';
import { epicMiddleware, rootEpic } from '../epics';

export interface ModuleTypes {
    storage: Store;
    usersService: UsersService;
}

function getStore() {
    // @ts-ignore: Redux DevTools
    const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    const composeEnhancers = reduxDevtools || compose;
    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(epicMiddleware))
    );
    epicMiddleware.run(rootEpic);
    return store;
}

export function registerServices() {
    container.register({
        storage: asValue(getStore()),
        usersService: asClass(UsersService).singleton(),
    });
}
