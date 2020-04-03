import { UserResponse } from './users-response';

export interface Biography {
    fullName: string;
    description: string;
}

export function parseBiography(user: UserResponse): Biography {
    return {
        fullName: user.name,
        description: user.bio,
    };
}
