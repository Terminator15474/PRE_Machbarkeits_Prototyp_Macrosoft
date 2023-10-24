<script lang="ts">
    import { beforeNavigate, goto } from "$app/navigation";
    import { get } from "$lib";

    beforeNavigate(async ({ to, cancel }) => {
        if (to == null) return;

        console.log(to?.url.searchParams.has("go"));
        if (to?.url.searchParams.has("go")) {
            to?.url.searchParams.delete("go");
            return;
        }

        cancel();
        let response = await get("http://localhost:5654/api/login_status"); // Simulate async check
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

<slot />
