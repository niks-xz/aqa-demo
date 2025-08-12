import { test as baseTest } from '@playwright/test';
import { getExistingUser, getInvalidStaticUser, getStaticUser, getUniqueUser } from '@utils/data/generators/user.generator';
import { User } from '@models/user.model';
import { deleteUserByEmail } from '@utils/api/user.api';

interface UserFixture {
    userHelpers: UserHelpers
}

interface UserHelpers {
    getStaticUser: () => User;
    getInvalidStaticUser: () => User;
    getExistingUser: () => User;
    getUniqueUser: () => User;
    getUserWithTrack: (getUserFunc: () => User) => User;
    users: User[];
}

export function registerUserFixture(test: typeof baseTest) {
    return test.extend<UserFixture>({
        async userHelpers({ request }, use) {
            const userHelpers: UserHelpers = {
                users: [],
                getStaticUser,
                getInvalidStaticUser,
                getExistingUser,
                getUniqueUser,
                getUserWithTrack: (getUserFunc: () => User) => {
                    const user = getUserFunc();
                    userHelpers.users.push(user);
                    return user;
                },
            }

            await use(userHelpers);

            await Promise.all(userHelpers.users.map((user: User) =>
                deleteUserByEmail(request, user.email)
            ));
        }
    });
}
