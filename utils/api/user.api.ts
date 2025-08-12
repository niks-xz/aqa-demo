import { APIRequestContext } from "@playwright/test";
import { config } from "@config/index.config";

export async function deleteUserByEmail(request: APIRequestContext, email: string) {
    const response = await request.delete(`${config.apiBaseUrl}/rest/user/${encodeURIComponent(email)}`)

    if (response.ok()) {
        console.log(`Пользователь ${email} успешно удален`);
    } else if (response.status() >= 400) {
        console.log(`Ошибка при удалении пользователя ${email}: ${response.statusText()}`);
    }
}