import { expect, Locator, Page, Response } from "@playwright/test";
import { User } from "@models/user.model";

export class RegisterPage {
    private readonly page: Page;
    private readonly headLocator: Locator;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly confirmPasswordInput: Locator;
    private readonly secretQuestionSelect: Locator;
    private readonly secretQuestionOption: Locator;
    private readonly secretAnswerInput: Locator;
    private readonly registerButton: Locator;
    private res!: Promise<Response>;

    constructor(page: Page) {
        this.page = page;

        this.headLocator = page.getByRole('heading', { level: 1 });
        this.emailInput = page.getByRole('textbox', { name: 'Email address field' });
        this.passwordInput = page.getByRole('textbox', { name: 'Field for the password' });
        this.confirmPasswordInput = page.getByRole('textbox', { name: 'Field to confirm the password' });
        this.secretQuestionSelect = page.getByRole('combobox', { name: 'Selection list for the security question' }).locator('../..');
        this.secretQuestionOption = page.getByRole('option', { name: 'Your eldest siblings middle' });
        this.secretAnswerInput = page.getByRole('textbox', { name: 'Field for the answer to the' });
        this.registerButton = page.getByRole('button', { name: 'Button to complete the' });
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

    async register(user: User) {
        await this.go();
        await this.checkHeadText();
        await this.fillForm(user);
        this.res = this.waitForApiResponse();
        await this.clickRegisterButton();
    }

    async checkRegisterSuccess() {
        expect((await this.res).ok()).toBe(true);

        await expect(this.page.getByText('Регистрация успешно завершена. Теперь вы можете войти.')).toBeVisible();
    }
}