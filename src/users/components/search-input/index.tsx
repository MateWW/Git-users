import React from 'react';

import { RequestStatus } from 'common/enums/request-status.enum';
import { SrOnly } from 'common/styles/sr-only';

import { User } from '../../models/user';
import { InputWrapper, SearchInputLoader } from './input';
import { Label } from './label';
import { ListWrapper, List, ListText, ListError, ListLoader } from './list';

interface Props {
    users: User[];
    value: string;
    status: RequestStatus;
    error: string;
    onChange: (phrase: string) => void;
    onSelect: (user: User) => void;
}

export function SearchInput(props: Props) {
    return (
        <Label>
            <SrOnly>Github user:</SrOnly>
            <SrOnly role="status" aria-live="polite">
                {getAriaText(props)}
            </SrOnly>
            <InputWrapper>
                <input
                    type="text"
                    value={props.value}
                    onChange={(event) => props.onChange(event.target.value)}
                    placeholder={'Username...'}
                    aria-autocomplete="list"
                />
                {props.status === RequestStatus.PENDING && (
                    <SearchInputLoader />
                )}
            </InputWrapper>
            <ListWrapper>
                <ListContent {...props} />
            </ListWrapper>
        </Label>
    );
}

function getAriaText({ users, status, error }: Props): string {
    switch (status) {
        case RequestStatus.FAILED:
            return error;

        case RequestStatus.PENDING:
            return 'Wait we are fetching proposed users...';

        case RequestStatus.SUCCEED:
            return `There are ${users.length} suggestions. Use tab and shift+tab to browse.`;

        default:
            return '';
    }
}

function ListContent({ status, users, error, onSelect, value }: Props) {
    switch (status) {
        case RequestStatus.FAILED:
            return <ListError>{error}</ListError>;

        case RequestStatus.PENDING:
            return <ListLoader />;

        case RequestStatus.SUCCEED:
            return users.length
                ? getList(users, onSelect)
                : getSuccessText(value);

        default:
            return <ListText>Type least 4 signs to start search...</ListText>;
    }
}

function getSuccessText(value: string) {
    return (
        <ListText>
            {value.length > 3
                ? 'No users are matched'
                : 'Type least 4 signs to start search...'}
        </ListText>
    );
}

function getList(users: User[], onSelect: Props['onSelect']) {
    const selectUser = (event: React.MouseEvent, user: User) => {
        event.preventDefault();
        onSelect(user);
    };

    return (
        <List>
            {users.map((user) => (
                <li key={user.id}>
                    <button onClick={(e) => selectUser(e, user)}>
                        {user.name}
                    </button>
                </li>
            ))}
        </List>
    );
}
