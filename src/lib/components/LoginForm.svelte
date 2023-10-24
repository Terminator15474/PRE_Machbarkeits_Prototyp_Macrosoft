<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { post } from "$lib";
    import { loading, userStore } from "$lib/store";
    import Button from "./Button.svelte";

    let mail = "";
    let password = "";
    async function handleSubmit() {
        $loading = true;
        let response = await post("http://localhost:5654/api/login", {
            email: mail,
            password: password,
        });
        let url = $page.url.searchParams.get("redirect_to") || "/";
        if (response.ok) {
            let userData = await response.json();
            userStore.set({
                username: userData.username,
                email: userData.email,
            });
            goto(url || "/").then(() => {
                $loading = false;
            });
        } else {
            $loading = false;
            alert("Login fehlgeschlagen");
        }
    }
</script>

<main>
    <h1 class="center">login</h1>

    <input  type="email" placeholder="Mustermail@gmail.com" bind:value={mail}><br>
    
    <input  type="password" placeholder="password" bind:value={password}><br>

    <Button type="primary" on:click={() => handleSubmit()}>submit</Button>
</main>

<style>
    .center {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25ch;
    }

    input {
        width: 20%;
        padding: 10px;
        margin: 5px 0;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    input:hover,
    input:focus {
        border-color: #007bff;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }

    input:disabled {
        background-color: #eee;
        color: #999;
    }
</style>
