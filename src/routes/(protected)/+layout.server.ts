import { get } from '$lib';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
    let response = await get("http://localhost:5654/login_status");
    if (response.status != 200) {
        throw redirect(302, "/login");
    }

    return {};
};