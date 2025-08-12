import { test as baseTest, Response } from "@playwright/test"
import { registerUserFixture } from '@fixtures/user.fixture';
import { RegisterPage } from '@pages/register.page';
import { User } from "@models/user.model";

const test = registerUserFixture(baseTest);

test.describe('Регистрация', () => {
  test('Успешная регистрация', async ({ page, userHelpers }) => {
    let registerPage: RegisterPage;
    let user: User;
    let response: Promise<Response>;

    await test.step('Подготовка', () => {
      registerPage = new RegisterPage(page);
      user = userHelpers.getUserWithTrack(userHelpers.getUniqueUser);
    })

    await test.step('Действие', () => {
      response = registerPage.register(user);
    })

    await test.step('Проверка', async () => {
      await registerPage.checkRegisterSuccess(response);
    })
  });

  test('Регистрация существующего пользователя', async ({ page, userHelpers }) => {
    let registerPage: RegisterPage;
    let user: User;
    let response: Promise<Response>;

    await test.step('Подготовка', () => {
      registerPage = new RegisterPage(page);
      user = userHelpers.getExistingUser();
    })

    await test.step('Действие', () => {
      response = registerPage.register(user);
    })

    await test.step('Проверка', async () => {
      await registerPage.checkEmailUniquenessError(response);
    })
  })
})