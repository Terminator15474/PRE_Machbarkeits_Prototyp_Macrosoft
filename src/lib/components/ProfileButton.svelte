<script>
    import {fly} from 'svelte/transition';
    let showMenu = false;
</script>

<style>
    .profile-button {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: fit-content;
        margin-right: 0.5vw;
    }

    img {
        float: right;
        border-radius: 10%;
        width: 3vw;
        aspect-ratio: 1/1;
        justify-content: center;
        align-items: center;
    }

    img{
        align-self: center;
        scale: 0.8;
    }
/* 
    .profile-button:hover > .menu {
        z-index: 10;
        border: 2px solid var(--primary-accent-color);
        transform: translateY(5vh);
        transition: transform 500ms;
        z-index: 10;
    } */
    .profile-button:hover > img {
        animation: image-rotate 600ms ease-out both
    }

    @keyframes image-rotate{
        0% { transform: rotate(0deg);}
        100% { transform: rotate(360deg); border-radius: 50%;}
    }

    .menu {
        position: absolute;
        top: 4em;
        align-self: center;
        width: fit-content;
        height: fit-content;
        background-color: var(--background-color);
        border: 2px solid var(--primary-accent-color);
        border-radius: 10%;
    }

    .menu-item {
        position: relative;
        background-color: transparent;
        display: block;
        text-align: center;
        text-decoration: none;
    }

</style>

<div role="complementary" class="profile-button" on:mouseover={() => {showMenu = true}} on:focus={null} on:blur={null} on:mouseout={() => {showMenu = false}}>
    <img src="macrosoft.png" alt="" on:mouseover={() => {showMenu = true}} on:focus={null} on:blur={null} on:mouseout={() => {showMenu = false}}>
    {#if showMenu}
        <div transition:fly={{ y: -20, duration: 50 }} class="menu">
            <a class="menu-item" href="/admin">Profil</a>
            <a class="menu-item" href="/logout">Abmelden</a>
        </div>
    {/if}
</div>