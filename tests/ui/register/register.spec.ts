import { test as baseTest } from "@playwright/test"
import { registerUserFixture } from '@fixtures/user.fixture';
import { RegisterPage } from '@pages/register.page';
import { User } from "@models/user.model";

const test = registerUserFixture(baseTest);

test.describe('Регистрация', () => {
  test('Успешная регистрация', async ({ page, userHelpers }) => {
    let registerPage: RegisterPage;
    let user: User;

    await test.step('Подготовка', () => {
      registerPage = new RegisterPage(page);
      user = userHelpers.getUserWithTrack(userHelpers.getUniqueUser);
    })

    await test.step('Действие', async () => {
      await registerPage.register(user);
    })

    await test.step('Проверка', async () => {
      await registerPage.checkRegisterSuccess();
    })
  });
})