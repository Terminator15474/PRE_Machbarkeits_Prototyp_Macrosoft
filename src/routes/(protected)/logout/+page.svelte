<script lang="ts">
    import { goto } from "$app/navigation";
    import { post } from "$lib";
    import { onMount } from "svelte";

    onMount(async () => {
        await post("http://localhost:5654/api/logout");

        goto("/login?redirect_to=/&go=true");
    });
</script>
