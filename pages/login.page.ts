import { User } from "@models/user.model";
import { expect, Locator, Page, Response } from "@playwright/test";

export class LoginPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private get mainTitle(): Locator {
        return this.page.getByRole('heading', { name: 'Login' });
    }

    private get emailInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Text field for the login email' })
    }

    private get passwordInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Text field for the login password' })
    }

    private get loginButton(): Locator {
        return this.page.getByRole('button', { name: 'Login', exact: true })
    }

    private async go() {
        await this.page.goto('/#/login');
    }

    private async checkMainTitle() {
        await expect(this.mainTitle).toBeVisible();
    }

    private waitForApiResponse(): Promise<Response> {
        return this.page.waitForResponse('/rest/user/login');
    }

    async checkLoginSuccess(response: Promise<Response>) {
        const body = await (await response).json();
        expect(body.authentication.token).not.toEqual('');
        await this.page.waitForURL('/#/search', { waitUntil: 'commit', timeout: 2000 });
    }

    async checkLoginError(response: Promise<Response>) {
        expect((await response).status()).toBeGreaterThanOrEqual(400);
        await expect(this.page.getByText('Invalid email or password.')).toBeVisible();
        await expect(this.page.getByText('Login')).toBeVisible();
    }

    async login(user: User): Promise<Response> {
        await this.go();
        await this.checkMainTitle();
        await this.fillForm(user);
        const response = this.waitForApiResponse();
        await this.clickLoginButton();

        return response;
    }

    private async fillForm(user: User) {
        await this.emailInput.fill(user.email);
        await this.passwordInput.fill(user.password);
    }

    private async clickLoginButton() {
        await this.loginButton.click();
    }
}
