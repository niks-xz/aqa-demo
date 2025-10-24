import { registerUserFixture } from '@fixtures/user.fixture';
import { User } from "@models/user.model";
import { RegisterPage } from '@pages/register.page';
import { test as baseTest, Response } from "@playwright/test";

const test = registerUserFixture(baseTest);

test.describe('Регистрация', () => {
  test('Успешная регистрация', { tag: ['@critical', '@positive', '@flaky'] }, async ({ page, userHelpers }) => {
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

  test('Регистрация существующего пользователя', { tag: ['@negative', '@flaky'] }, async ({ page, userHelpers }) => {
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
      await registerPage.checkRegisterUniquenessEmailError(response);
    })
  })

  test('Регистрация c невалидным email', { tag: ['@negative', '@fail'] }, async ({ page, userHelpers }, testInfo) => {
    test.fail(true, 'Известный баг. Регистрация с невалидным email проходит успешно.');
    testInfo.annotations.push({ type: 'bug', description: '{номер задачи в трекере}' });

    let registerPage: RegisterPage;
    let user: User;
    let response: Promise<Response>;

    await test.step('Подготовка', () => {
      registerPage = new RegisterPage(page);
      user = userHelpers.getUserWithTrack(userHelpers.getInvalidEmailStaticUser);
    })

    await test.step('Действие', () => {
      response = registerPage.register(user);
    })

    await test.step('Проверка', async () => {
      await registerPage.checkRegisterInvalidEmailError(response);
    })
  })

  test('Регистрация c невалидным повтором пароля', { tag: '@negative' }, async ({ page, userHelpers }) => {
    let registerPage: RegisterPage;
    let user: User;

    await test.step('Подготовка', () => {
      registerPage = new RegisterPage(page);
      user = userHelpers.getInvalidRepeatPasswordStaticUser();
    })

    await test.step('Действие', async () => {
      await registerPage.registerFillFormOnly(user);
    })

    await test.step('Проверка', async () => {
      await registerPage.checkRegisterInvalidRepeatPasswordError();
    })
  })
})
