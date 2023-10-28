import { get } from '$lib';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url, fetch }) => {
    let response = await fetch("http://localhost:5654/api/login_status");
    if (response.status != 200) {
        throw redirect(302, `/login?redirect_to=${url.pathname}${url.search}`);
    }

    return {};
};