import { UserResponse } from './users-response';
export interface User {
    name: string;
    avatar: string;
    score: number;
}

export function parseUser(userReponse: UserResponse): User {
    const gravatarUrl = `https://www.gravatar.com/avatar/${userReponse.gravatar_id}`;
    return {
        name: userReponse.login,
        avatar: userReponse.avatar_url || gravatarUrl,
        score: userReponse.score,
    };
}
