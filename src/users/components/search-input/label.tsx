import styled from '@emotion/styled/macro';

import { ListWrapper } from './list';

export const Label = styled('label')`
    width: 100%;
    max-width: 320px;
    position: relative;

    &:focus-within ${ListWrapper} {
        display: block;
    }
`;
