import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from '@emotion/styled/macro';
import { faDharmachakra } from '@fortawesome/free-solid-svg-icons';

import { colors } from 'common/styles/variables';
import { SrOnly } from 'common/styles/sr-only';

export const ListWrapper = styled('div')`
    display: none;
    width: 100%;
    position: absolute;
    left: 0;
    top: 100%;
    z-index: 100;
    max-height: 60vh;
    background: ${colors.white};
    border: 2px solid ${colors.p3};
    border-top: 0;
    box-sizing: border-box;
    overflow: scroll;
`;

export const List = styled('ul')`
    list-style: none;
    padding: 0;
    margin: 0;

    button {
        display: block;
        width: 100%;
        padding: 5px 10px;
        border: none;
        color: ${colors.p1};
        font-size: 16px;
        text-align: left;
        text-decoration: none;
        transition: color 0.3s, background 0.3s;
        cursor: pointer;

        &:hover,
        &:focus {
            color: ${colors.white};
            background: ${colors.p2};
        }
    }
`;

const ListLoaderWrapper = styled('p')`
    margin: 0;
    padding: 10px;
    text-align: center;
`;

export const ListLoader = () => (
    <ListLoaderWrapper>
        <SrOnly>Loading...</SrOnly>
        <FontAwesomeIcon icon={faDharmachakra} spin={true} size={'2x'} />
    </ListLoaderWrapper>
);

export const ListText = styled('p')`
    width: 100%;
    padding: 10px;
    margin: 0;
    box-sizing: border-box;
    text-align: center;
`;

export const ListError = styled(ListText)`
    color: ${colors.p3};
`;
