import { User } from "@models/user.model";

export function getStaticUser(): User {
    return {
        email: 'test@test.ru',
        password: 'qwe123QWE!@#',
    }
}

export function getUniqueUser(): User {
    const suffix = Date.now().toString(36) + Math.random().toString(36).slice(2, 8)

    return {
        email: `test${suffix}@test.ru`,
        password: `qwe${suffix}QWE!@#$`,
    }
}
