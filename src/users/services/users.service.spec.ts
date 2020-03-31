import { of, Subject, throwError } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';

import { mockStore } from 'common/utils/test-utils';
import { RequestStatus } from 'common/enums/request-status.enum';

import { parseUser } from '../models/user';
import { UsersService } from './users.service';
import * as UsersState from './users.state';
import { searchUsers } from './user.service.mock.json';

describe('users/services/users.service.ts', () => {
    const getService = () => new UsersService();

    test('should get users', () => {
        const setUsers = jest.fn(() => true);
        const state = {
            users: { searchUser: 'MateW' },
        };
        const usersRequest = jest
            .spyOn(ajax, 'get')
            .mockReturnValue(of(searchUsers as AjaxResponse));

        mockStore(null, state, setUsers);

        getService();
        expect(usersRequest).toHaveBeenCalledWith(
            `https://api.github.com/search/users?q=MateW`
        );
        expect(setUsers).toHaveBeenCalledWith(
            'users',
            expect.objectContaining({ searchStatus: RequestStatus.PENDING })
        );
        expect(setUsers).toHaveBeenCalledWith(
            'users',
            expect.objectContaining({
                searchStatus: RequestStatus.SUCCEED,
                users: [parseUser(searchUsers.response.items[0])],
            })
        );
    });

    test('should failed while searching for user', () => {
        const setUsers = jest.fn(() => true);
        const state = {
            users: { searchUser: 'MateW' },
        };
        const usersRequest = jest
            .spyOn(ajax, 'get')
            .mockReturnValue(throwError('This is an error!'));

        mockStore(null, state, setUsers);

        getService();
        expect(usersRequest).toHaveBeenCalledWith(
            `https://api.github.com/search/users?q=MateW`
        );
        expect(setUsers).toHaveBeenCalledWith(
            'users',
            expect.objectContaining({ searchStatus: RequestStatus.PENDING })
        );
        expect(setUsers).toHaveBeenCalledWith(
            'users',
            expect.objectContaining({
                searchStatus: RequestStatus.FAILED,
                searchError: expect.any(String),
            })
        );
    });
});
