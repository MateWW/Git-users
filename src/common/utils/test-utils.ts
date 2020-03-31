import { of, Observable } from 'rxjs';
import * as injectionService from 'common/services/injection.service';
import { ModuleTypes, ModuleKeys } from '../config/injection.config';
import { Store } from '../services/store.service';
import pick from 'lodash/pick';

export function mockStore(
    register: null | Store['register'],
    getData: null | Record<string, unknown>,
    set: null | Store['set']
) {
    const StoreInstance = new Store();
    jest.spyOn(StoreInstance, 'register').mockImplementation(
        register || jest.fn(() => true)
    );
    jest.spyOn(StoreInstance, 'get').mockImplementation(
        jest.fn((key?: string, ...keys: string[]) => {
            if (!getData || !key) {
                return of(getData || {});
            }
            return of(keys.length ? pick(getData, key, ...keys) : getData[key]);
        })
    );
    jest.spyOn(StoreInstance, 'set').mockImplementation(
        set || jest.fn(() => true)
    );
    mockInject(StoreInstance);
    return StoreInstance;
}

export function mockInject<T extends ModuleKeys>(module: ModuleTypes[T]) {
    // return jest.spyOn(injectionService, 'inject').mockReturnValue(module);
}

export function cleanUpMocks() {
    return jest.resetModules();
}
