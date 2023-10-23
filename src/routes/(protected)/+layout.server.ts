import { get } from '$lib';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request, cookies }) => {
    let allCookies = cookies.getAll();
    let textCookies = allCookies.map(e => `${e.name}=${e.value}`);
    let cookieString = textCookies.reduce((prev, current, currentIndex) => currentIndex != 0 ? prev += `; ${current}` : prev += current);

    let response = await get("http://localhost:5654/api/login_status", { "Cookie": cookieString });
    if (response.status != 200) {
        throw redirect(302, `/login?redirect_to=/${request.url.split("//")[1].split("/")[1]}`);
    }

    return {};
};