import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';

import { parseUser, User } from '../models/user';
import { SearchUsersReponse, UserResponse } from '../models/users-response';
import { Repository, parseRepository } from '../models/repository';
import { UsersRepositoriesResponse } from '../models/users-repositories-response';
import { Biography, parseBiography } from '../models/biography';

export class UsersService {
    private static apiUrl = 'https://api.github.com';

    public usersSearch(phrase: string): Observable<User[] | string> {
        return ajax.get(this.getSearchUserUrl(phrase)).pipe(
            map((responseContainer) => {
                const body: SearchUsersReponse = responseContainer.response;
                return body.items.map(parseUser);
            }),
            catchError(() => ['Something went wrong!'])
        );
    }

    private getSearchUserUrl(user: string): string {
        return `${UsersService.apiUrl}/search/users?q=${encodeURI(user)}`;
    }

    public biographyFetch(user: string): Observable<Biography | string> {
        return ajax.get(this.getUserUrl(user)).pipe(
            map((responseContainer) => {
                const body: UserResponse = responseContainer.response;
                return parseBiography(body);
            }),
            catchError(() => ['Something went wrong!'])
        );
    }

    private getUserUrl(user: string): string {
        return `${UsersService.apiUrl}/users/${encodeURI(user)}`;
    }

    public repositoriesFetch(user: string): Observable<Repository[] | string> {
        return ajax.get(this.getRepositoriesUrl(user)).pipe(
            map((responseContainer) => {
                const body: UsersRepositoriesResponse =
                    responseContainer.response;
                return body
                    .map(parseRepository)
                    .sort((a, b) => b.stars - a.stars)
                    .slice(0, 3);
            }),
            catchError(() => ['Something went wrong!'])
        );
    }

    private getRepositoriesUrl(user: string): string {
        return `${UsersService.apiUrl}/users/${encodeURI(user)}/repos`;
    }
}
