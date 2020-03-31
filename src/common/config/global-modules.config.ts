import { createStore, applyMiddleware, Store } from 'redux';
import { asClass, asValue } from 'awilix';

import { container } from 'common/services/injection.service';
import { UsersService } from 'users/services/users.service';

import { rootReducer } from '../reducers';
import { epicMiddleware } from '../epics';

export interface ModuleTypes {
    storage: Store;
    usersService: UsersService;
}

container.register({
    storage: asValue(createStore(rootReducer, applyMiddleware(epicMiddleware))),
    usersService: asClass(UsersService).singleton(),
});
