<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { get } from "$lib";
    import LoginForm from "$lib/components/LoginForm.svelte";
    import { onMount } from "svelte";

    onMount(async () => {
        let loginStatus = await get("http://localhost:5654/api/login_status");
        if (loginStatus.ok) {
            let redirectUrl = $page.url.searchParams.get("redirect_to") || "/";
            await goto(redirectUrl);
        }
    });
</script>

<LoginForm />
