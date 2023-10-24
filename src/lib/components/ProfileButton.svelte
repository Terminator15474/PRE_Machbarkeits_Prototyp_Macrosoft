<script lang="ts">
    import {fly} from 'svelte/transition';
    import {userStore} from '$lib/store';
    let showMenu = false;
    let menu: HTMLDivElement;
</script>

<style>
    .profile-button {
        position: relative;
        display: flex;
        flex-direction: row;
        align-content: end;
        justify-content: center;
        align-items: center;
        height: 100%;
        margin-right: 0.5vw;
        cursor: pointer;
    }
    img {
        float: right;
        border-radius: 10%;
        width: 4em;
        aspect-ratio: 1/1;
        justify-content: center;
        align-items: center;
    }

    img{
        align-self: center;
        scale: 0.8;
    }
    .menu {
        position: absolute;
        top: 4em;
        right: -0.25vw;
        width: fit-content;
        height: fit-content;
        background-color: var(--background-color);
        border: 2px solid var(--primary-accent-color);
        border-radius: 10%;
        z-index: 10;
    }

    .menu-item {
        position: relative;
        background-color: transparent;
        display: block;
        text-align: center;
        text-decoration: none;
    }    
    .username {
        width: fit-content;
        max-width: 10vw;
        text-wrap: wrap;
    }
</style>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div role="complementary" class="profile-button" on:click={() => {showMenu = !showMenu}}>
    <div class="username">{$userStore.username}</div>
    <img src="macrosoft.png" alt="">
    {#if showMenu}
        <div in:fly={{ y: -20, duration: 150 }} class="menu" bind:this={menu}>
            <a class="menu-item" href="/admin">Profil</a>
            <a class="menu-item" href="/logout">Abmelden</a>
        </div>
    {/if}
</div>