import { ajax, AjaxResponse } from 'rxjs/ajax';
import { of } from 'rxjs';

import { UsersService } from './users.service';
import {
    searchUsers,
    fullUserData,
    repositories,
} from './user.service.mock.json';
import { parseUser } from '../models/user';
import { SearchResponseUser, UserResponse } from '../models/users-response';
import { parseBiography } from '../models/biography';
import { parseRepository } from '../models/repository';
import { RepositoryResponse } from '../models/users-repositories-response';

describe('src/users/services/users.service.ts', () => {
    const getService = () => new UsersService();

    test('fetch users list', () => {
        jest.spyOn(ajax, 'get').mockReturnValue(
            of(searchUsers as AjaxResponse)
        );

        const searchPhrase = 'MockPhrase';
        const result = getService().usersSearch(searchPhrase).toPromise();

        expect(ajax.get).toHaveBeenCalledWith(
            expect.stringContaining(`/search/users?q=${searchPhrase}`)
        );
        return expect(result).resolves.toEqual([
            parseUser(searchUsers.response.items[0] as SearchResponseUser),
        ]);
    });

    test('fetch user biography', () => {
        jest.spyOn(ajax, 'get').mockReturnValue(
            of(fullUserData as AjaxResponse)
        );

        const user = 'MockUser';
        const result = getService().biographyFetch(user).toPromise();

        expect(ajax.get).toHaveBeenCalledWith(
            expect.stringContaining(`/users/${user}`)
        );
        return expect(result).resolves.toEqual(
            parseBiography(fullUserData.response as UserResponse)
        );
    });

    test('fetch user repositories', () => {
        jest.spyOn(ajax, 'get').mockReturnValue(
            of(repositories as AjaxResponse)
        );

        const user = 'MockUser';
        const result = getService().repositoriesFetch(user).toPromise();

        expect(ajax.get).toHaveBeenCalledWith(
            expect.stringContaining(`/users/${user}/repos`)
        );
        return expect(result).resolves.toEqual([
            parseRepository(repositories.response[0] as RepositoryResponse),
        ]);
    });
});
