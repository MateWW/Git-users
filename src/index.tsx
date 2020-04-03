import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Global, css } from '@emotion/core';

import {
    registerServices,
    ModuleTypes,
} from 'common/config/global-modules.config';
import { container } from 'common/services/injection.service';
import { colors } from 'common/styles/variables';

import * as serviceWorker from './serviceWorker';
import { UsersContainer } from './users/users.container';

registerServices();
const store = container.resolve<ModuleTypes['storage']>('storage');

const globalCss = css`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

    body {
        margin: 0;
        padding: 0;
        background: ${colors.white};
        color: ${colors.p1};
        font-family: 'Roboto', sans-serif;
    }
`;

ReactDOM.render(
    <React.StrictMode>
        <Global styles={globalCss} />
        <Provider store={store}>
            <UsersContainer></UsersContainer>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();
