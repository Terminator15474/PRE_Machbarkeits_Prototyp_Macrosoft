<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { get, post } from "$lib";
    import Button from "$lib/components/Button.svelte";
    import { loading } from "$lib/store";
    import { onMount } from "svelte";

    let validUrl = true;

    let pendingUrl = $page.url.searchParams.get("pending_id");
    let username = $page.url.searchParams.get("username");

    onMount(async () => {
        $loading = true;
        if (!validUrl) {
            $loading = false;
            return;
        }
        let response = await get(
            `http://localhost:5654/api/pending_id_valid?pending_id=${pendingUrl}`
        );
        if (response.status != 200) {
            validUrl = false;
        }
        $loading = false;
    });

    if (!pendingUrl || !username) {
        validUrl = false;
    }

    let password = "";
    let passwordRepeated = "";

    async function handleButtonClick() {
        if (password != passwordRepeated) {
            alert("Die beiden Passwörter müssen übereinstimmen");
            passwordRepeated = "";
            return;
        }

        if (password.length < 8) {
            alert("Das Passwort muss mindestens 8 Zeichen haben");
            passwordRepeated = "";
            password = "";
            return;
        }

        $loading = true;

        let response = await post("http://localhost:5654/api/confirm_user", {
            confirmationString: pendingUrl,
            password: password,
        });

        if (response.ok) {
            await goto("/login?redirect_to=/");
            $loading = false;
            return;
        }

        $loading = false;

        alert(
            "Es ist ein Fehler aufgetreten. Versuchen sie es bitte nocheinmal"
        );
    }
</script>

{#if validUrl}
    <main>
        <h1 class="center">Hallo {username}</h1>
        <h1 class="center">Bitte ihren Benutzer bestätigen</h1>

        <input
            type="password"
            placeholder="Neues Passwort eingeben"
            bind:value={password}
        />

        <input
            type="password"
            placeholder="Neues Passwort wiederholen"
            bind:value={passwordRepeated}
        />

        <Button type="primary" on:click={() => handleButtonClick()}
            >Bestätigen</Button
        >
    </main>
{:else}
    <main class="error-container">
        <h3>
            Diese Url ist nicht gültig. Bitte geben sie die richtige Url ein
            oder loggen sie sich ein:
        </h3>
        <a href="/login">Login</a>
    </main>
{/if}

<style>
    .error-container {
        height: 100vh;
        widows: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 0;
    }
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
