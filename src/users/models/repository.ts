import { RepositoryResponse } from './users-repositories-response';
export interface Repository {
    name: string;
    url: string;
    stars: number;
}

export function parseRepository(repository: RepositoryResponse): Repository {
    return {
        name: repository.name,
        url: repository.url,
        stars: repository.stargazers_count,
    };
}
