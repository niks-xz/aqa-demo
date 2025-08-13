import { User } from "@models/user.model";

export function getStaticUser(): User {
    return {
        email: 'static@user.ru',
        password: 'qwe123QWE!@#',
    }
}

export function getInvalidEmailStaticUser(): User {
    return {
        email: 'invalid@user',
        password: 'qwe123QWE!@#',
    }
}

export function getInvalidRepeatPasswordStaticUser(): User {
    return {
        email: 'invalidrepeatpasswordstatic@user.ru',
        password: 'qwe123QWE!@#',
        repeatPassword: 'qwe123QWE!@##',
    }
}

export function getExistingUser(): User {
    return {
        email: 'existing@user.ru',
        password: 'qwe123QWE!@#',
    }
}

export function getUniqueUser(): User {
    const suffix = Date.now().toString(36) + Math.random().toString(36).slice(2, 8)

    return {
        email: `unique${suffix}@user.ru`,
        password: `qwe${suffix}QWE!@#$`,
    }
}
