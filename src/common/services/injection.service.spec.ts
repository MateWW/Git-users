import { UsersService } from 'users/services/users.service';

import { container } from './injection.service';

describe('common/services/injection.service', () => {
    describe('should inject', () => {
        test('Store', () => {
            expect(container.resolve('storage')).toEqual(
                expect.objectContaining({
                    dispatch: expect.any(Function),
                    subscribe: expect.any(Function),
                })
            );
        });

        test('UsersService', () => {
            expect(container.resolve('usersService')).toEqual(
                expect.any(UsersService)
            );
        });
    });
});
