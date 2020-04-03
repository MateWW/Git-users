import React from 'react';
import styled from '@emotion/styled/macro';

import { colors } from 'common/styles/variables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDharmachakra } from '@fortawesome/free-solid-svg-icons';

export const InputWrapper = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    width: 100%;
    max-width: 320px;
    box-sizing: border-box;
    border: 2px solid ${colors.p3};
    transition: border 0.3s;

    input {
        padding: 8px 0;
        outline: none;
        border: 0;
        font-size: 16px;
        line-height: 20px;
    }

    &:focus-within {
        border-color: ${colors.p1};
    }
`;

const SearchInputLoaderWrapper = styled('div')`
    padding-left: 10px;
`;

export const SearchInputLoader = () => (
    <SearchInputLoaderWrapper>
        <FontAwesomeIcon spin={true} icon={faDharmachakra} />
    </SearchInputLoaderWrapper>
);
