import { expect, Locator, Page, Response } from "@playwright/test";
import { User } from "@models/user.model";
import { ValidationError, ValidationErrorResponse } from "@models/validationErrorResponse.model";

export class RegisterPage {
    private readonly page: Page;

    private get headLocator(): Locator {
        return this.page.getByRole('heading', { level: 1 });
    }

    private get emailInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Email address field' });
    }

    private get passwordInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Field for the password' });
    }

    private get confirmPasswordInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Field to confirm the password' });
    }

    private get secretQuestionSelect(): Locator {
        return this.page.getByRole('combobox', { name: 'Selection list for the security question' }).locator('../..');
    }

    private get secretQuestionOption(): Locator {
        return this.page.getByRole('option', { name: 'Your eldest siblings middle' });
    }

    private get secretAnswerInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Field for the answer to the' });
    }

    private get registerButton(): Locator {
        return this.page.getByRole('button', { name: 'Button to complete the' });
    }

    private get registerSuccessMessage(): Locator {
        return this.page.getByText('Регистрация успешно завершена. Теперь вы можете войти.');
    }

    private get emailUniquenessError(): Locator {
        return this.page.getByText('Email must be unique');
    }

    constructor(page: Page) {
        this.page = page;
    }

    private async go() {
        await this.page.goto('/#/register');
    }

    private async checkHeadText() {
        await expect(this.headLocator).toHaveText('Регистрация');
    }

    private async fillForm(user: User) {
        await this.emailInput.fill(user.email);
        await this.passwordInput.fill(user.password);
        await this.confirmPasswordInput.fill(user.password);
        await this.secretQuestionSelect.click();
        await this.secretQuestionOption.click();
        await this.secretAnswerInput.fill('Test Answer');
    }

    private waitForApiResponse() {
        return this.page.waitForResponse((response) => {
            return response.url().includes('/api/Users');
        });
    }

    private async clickRegisterButton() {
        await this.registerButton.click();
    }

    async register(user: User): Promise<Response> {
        await this.go();
        await this.checkHeadText();
        await this.fillForm(user);
        const response = this.waitForApiResponse();
        await this.clickRegisterButton();
        return response;
    }

    async checkRegisterSuccess(response: Promise<Response>) {
        expect((await response).ok()).toBe(true);

        await expect(this.registerSuccessMessage).toBeVisible();
    }

    async checkRegisterUniquenessEmailError(response: Promise<Response>) {
        const res = await response;
        const body: ValidationErrorResponse = await res.json();

        expect(res.status()).toBe(400);
        expect(body.errors.some((error: ValidationError) => error.message === 'email must be unique')).toBe(true);

        await expect(this.emailUniquenessError).toBeVisible();
    }

    async checkRegisterInvalidEmailError(response: Promise<Response>) {
        expect((await response).status()).toBeGreaterThanOrEqual(400);
        await expect(this.page.waitForURL('**/login', { timeout: 5000, waitUntil: 'commit' })).rejects.toThrow();
    }
}