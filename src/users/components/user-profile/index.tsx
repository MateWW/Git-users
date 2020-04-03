import React from 'react';

import { RequestStatus } from 'common/enums/request-status.enum';
import { SrOnly } from 'common/styles/sr-only';

import { User } from '../../models/user';
import { Repository } from '../../models/repository';
import { Biography } from '../../models/biography';
import { List, ListItem, StarIcon, ListLoader } from './list';
import {
    HeaderWrapper,
    AvatarWrapper,
    DetailsLoader,
    AvatarLabel,
    UserDetailsWrapper,
} from './header';

interface Props {
    user: User | null;
    biography: Biography | null;
    biographyStatus: RequestStatus;
    repositories: Repository[];
    repositoriesStatus: RequestStatus;
    error: string;
}

export function UserProfile({
    user,
    biography,
    biographyStatus,
    ...restProps
}: Props) {
    if (!user) {
        return <SelectUserMessage />;
    }
    return (
        <section>
            <HeaderWrapper>
                <AvatarWrapper>
                    <AvatarLabel>
                        Avatar of {getName(user, biography)} account
                    </AvatarLabel>
                    <img
                        src={user.avatar}
                        alt={`Avatar of ${getName(user, biography)} account`}
                    />
                </AvatarWrapper>
                <UserDetailsWrapper>
                    <h2>{getName(user, biography)}</h2>
                    <BiographyWrapper
                        biography={biography}
                        biographyStatus={biographyStatus}
                    />
                </UserDetailsWrapper>
            </HeaderWrapper>
            <article>
                <h3>Most stared repositories</h3>
                <RepositoriesList {...restProps} />
            </article>
        </section>
    );
}

function getName(user: User, biography: Biography | null) {
    return !!biography ? `${biography.fullName}(${user.name})` : user.name;
}

function SelectUserMessage() {
    return (
        <section>
            <h3>You have not Github user selected</h3>
            <p>Select him from top menu</p>
        </section>
    );
}

type BiographyProps = Pick<Props, 'biography' | 'biographyStatus'>;
function BiographyWrapper({ biography, biographyStatus }: BiographyProps) {
    switch (biographyStatus) {
        case RequestStatus.PENDING:
            return <DetailsLoader />;

        case RequestStatus.FAILED:
            return <></>;

        default:
            return biography && <p>{biography.description}</p>;
    }
}

type ListProps = Pick<Props, 'error' | 'repositories' | 'repositoriesStatus'>;
function RepositoriesList({
    error,
    repositories,
    repositoriesStatus,
}: ListProps) {
    switch (repositoriesStatus) {
        case RequestStatus.SUCCEED:
            return (
                <List>
                    {repositories.map(({ name, stars, url }) => (
                        <ListItem>
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <SrOnly>Will open in new tab</SrOnly>
                                <p>{name}</p>
                                <p>
                                    {stars}
                                    <StarIcon />
                                </p>
                            </a>
                        </ListItem>
                    ))}
                </List>
            );

        case RequestStatus.FAILED:
            return <p>{error}</p>;

        default:
            return <ListLoader />;
    }
}
