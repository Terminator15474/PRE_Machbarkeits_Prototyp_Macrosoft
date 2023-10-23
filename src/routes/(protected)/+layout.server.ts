import { get } from '$lib';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request }) => {
    let response = await get("http://localhost:5654/api/login_status");
    console.log(response);
    if (response.status != 200) {
        throw redirect(302, `/login?redirect_to=/${request.url.split("//")[1].split("/")[1]}`);
    }
    
    return {};
};