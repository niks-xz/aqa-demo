import { APIRequestContext } from "@playwright/test";
import { config } from "@config/index.config";

export async function deleteUserByEmail(request: APIRequestContext, email: string) {
    console.log('config', config.apiBaseUrl)
    const res = await request.delete(`${config.apiBaseUrl}/rest/user/${encodeURIComponent(email)}`)

    if (res.ok()) {
        console.log(`Пользователь ${email} успешно удален`);
    } else if (res.status() >= 400) {
        console.log(`Ошибка при удалении пользователя ${email}: ${res.statusText()}`);
    }
}