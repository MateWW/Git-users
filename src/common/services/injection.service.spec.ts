import { UsersService } from 'users/services/users.service';
import { container } from './injection.service';

describe('common/services/injection.service', () => {
    describe('should inject', () => {
        test('Store', () => {
            console.log(container.resolve('storage'));
            expect(container.resolve('storage')).toEqual(expect.anything());
        });
        test('UsersService', () => {
            expect(container.resolve('usersService')).toEqual(
                expect.any(UsersService)
            );
        });
    });
});
