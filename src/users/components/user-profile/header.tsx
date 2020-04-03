import React from 'react';
import styled from '@emotion/styled/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDharmachakra } from '@fortawesome/free-solid-svg-icons';

import { SrOnly } from 'common/styles/sr-only';
import { colors, mobileBreakpoint } from 'common/styles/variables';

export const HeaderWrapper = styled('header')`
    display: flex;
    align-items: center;
    margin-top: 20px;

    @media screen and (max-width: ${mobileBreakpoint}) {
        flex-wrap: wrap;
    }
`;

export const AvatarWrapper = styled('figure')`
    max-width: 180px;
    width: 30%;
    padding: 0;
    margin: 0;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        display: block;
        padding-bottom: 100%;
    }

    img {
        width: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    @media screen and (max-width: ${mobileBreakpoint}) {
        width: 100%;
        max-width: 100%;
    }
`;

export const AvatarLabel = SrOnly.withComponent('figcaption');

export const UserDetailsWrapper = styled('div')`
    margin-left: 40px;

    h2 {
        margin-top: 0;
    }

    p {
        max-width: 320px;
        margin: 0;
        color: ${colors.p1};
    }

    @media screen and (max-width: ${mobileBreakpoint}) {
        margin-top: 20px;
        margin-left: 0;
    }
`;

export const DetailsLoader = () => (
    <FontAwesomeIcon spin={true} icon={faDharmachakra} />
);
