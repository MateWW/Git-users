import { createContainer, InjectionMode } from 'awilix';

import { ModuleTypes } from 'common/config/global-modules.config';

export const container = createContainer<ModuleTypes, ModuleTypes>({
    injectionMode: InjectionMode.PROXY,
});
