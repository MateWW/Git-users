import { SearchResponseUser } from './users-response';
export interface User {
    id: number;
    name: string;
    avatar: string;
    score: number;
}

export function parseUser(userReponse: SearchResponseUser): User {
    const gravatarUrl = `https://www.gravatar.com/avatar/${userReponse.gravatar_id}`;
    return {
        id: userReponse.id,
        name: userReponse.login,
        avatar: userReponse.avatar_url || gravatarUrl,
        score: userReponse.score,
    };
}
