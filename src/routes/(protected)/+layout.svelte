<script lang="ts">
    import { beforeNavigate, goto } from "$app/navigation";
    import { get } from "$lib";
    import LoadingIndicator from "$lib/components/LoadingIndicator.svelte";
    import { loading } from "$lib/store";

    beforeNavigate(async ({ to, cancel }) => {
        if (to == null) return;

        console.log(to?.url.searchParams.has("go"));
        if (to?.url.searchParams.has("go")) {
            to?.url.searchParams.delete("go");
            $loading = false;
            return;
        }

        $loading = true;

        cancel();
        let response = await get("http://localhost:5654/api/login_status");
        if (response.status != 200 && to != null) {
            to.url.searchParams.append(
                "redirect_to",
                `${to.url.pathname}${to.url.search}`
            );
            to.url.pathname = "/login";
        }
        to?.url.searchParams.append("go", "true");
        console.log(to?.url.toString());

        goto(to?.url.toString() || "/login");
    });
</script>

<LoadingIndicator />
<slot />
