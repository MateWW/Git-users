import React from 'react';
import styled from '@emotion/styled/macro';
import { shallowEqual, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons';

import { useTypedSelector } from 'common/selectors';
import { colors, mobileBreakpoint } from 'common/styles/variables';

import {
    getSearchInputData,
    getProfileData,
} from './selectors/users.selectors';
import { setSearchPhrase, selectUser } from './actions/users.actions';
import { UserProfile } from './components/user-profile';
import { SearchInput } from './components/search-input';

const PageWrapper = styled('div')`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;
`;

const PageHeader = styled('header')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid ${colors.p1};
    padding: 20px;
    box-sizing: border-box;

    @media screen and (max-width: ${mobileBreakpoint}) {
        flex-wrap: wrap;
        padding: 20px 0;
    }
`;

const PageTitle = styled('h1')`
    margin: 0;

    @media screen and (max-width: ${mobileBreakpoint}) {
        margin-bottom: 20px;
    }
`;

const GitIcon = styled(FontAwesomeIcon)`
    margin-left: 10px;
`;

export function UsersContainer() {
    const searchInputProps = useTypedSelector(getSearchInputData, shallowEqual);
    const userProfileProps = useTypedSelector(getProfileData, shallowEqual);
    const dispatch = useDispatch();
    return (
        <PageWrapper>
            <PageHeader>
                <PageTitle>
                    Github preview
                    <GitIcon icon={faGithubAlt} />
                </PageTitle>
                <SearchInput
                    {...searchInputProps}
                    onChange={(phrase) => dispatch(setSearchPhrase(phrase))}
                    onSelect={(user) => dispatch(selectUser(user))}
                />
            </PageHeader>
            <main>
                <UserProfile {...userProfileProps} />
            </main>
        </PageWrapper>
    );
}
