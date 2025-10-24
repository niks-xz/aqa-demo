import { registerUserFixture } from '@fixtures/user.fixture';
import { User } from '@models/user.model';
import { LoginPage } from '@pages/login.page';
import { test as baseTest, Response } from '@playwright/test';

const test = registerUserFixture(baseTest)

test.describe('Вход', () => {
    test('Успешный вход', { tag: ['@critical', '@positive'] }, async ({ page, userHelpers }) => {
        let loginPage: LoginPage;
        let user: User;
        let response: Promise<Response>;

        await test.step('Подготовка', () => {
            loginPage = new LoginPage(page);
            user = userHelpers.getExistingUser();
        })

        await test.step('Действие', () => {
            response = loginPage.login(user);
        })

        await test.step('Проверка', async () => {
            await loginPage.checkLoginSuccess(response);
        })
    })

    test('Неверный пароль', { tag: '@negative' }, async ({ page, userHelpers }) => {
        let loginPage: LoginPage;
        let user: User;
        let response: Promise<Response>;

        await test.step('Подготовка', () => {
            loginPage = new LoginPage(page);
            user = userHelpers.getWrongPasswordStaticUser();
        })

        await test.step('Действие', () => {
            response = loginPage.login(user);
        })

        await test.step('Проверка', async () => {
            await loginPage.checkLoginError(response);
        })
    })
})
