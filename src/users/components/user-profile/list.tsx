import React from 'react';
import styled from '@emotion/styled/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faDharmachakra } from '@fortawesome/free-solid-svg-icons';

import { colors, mobileBreakpoint } from 'common/styles/variables';
import { SrOnly } from 'common/styles/sr-only';

export const List = styled('ul')`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0;
    margin: 0;
    list-style: none;
`;

export const ListItem = styled('li')`
    width: calc(33% - 13px);
    box-sizing: border-box;
    margin-bottom: 20px;
    border: 1px solid ${colors.p2};
    border-radius: 4px;
    box-shadow: 1px 1px 3px ${colors.p1};
    transition: box-shadow 0.3s;

    &:hover {
        box-shadow: 1px 2px 3px ${colors.p2};
    }

    a {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        box-sizing: border-box;
        text-decoration: none;
        color: ${colors.p1};
    }

    @media screen and (max-width: ${mobileBreakpoint}) {
        width: 100%;
    }
`;

const IconStarWrapper = styled('span')`
    margin-left: 10px;
    color: ${colors.g1};
`;

export const StarIcon = () => (
    <IconStarWrapper>
        <FontAwesomeIcon icon={faStar} />
    </IconStarWrapper>
);

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
