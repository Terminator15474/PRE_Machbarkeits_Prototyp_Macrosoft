<script>

</script>

<style>
    .profile-button {
        position: absolute;
        right: 1rem;
        top: 1rem;
        justify-content: center;
        align-items: center;
    }

    .profile-button img {
        float: right;
        border-radius: 10%;
        width: 3vw;
        aspect-ratio: 1/1;
        justify-content: center;
        align-items: center;
    }

    .menu {
        position: absolute;
        right: 3vw;
        top: 0.1rem;
        width: fit-content;
        height: fit-content;
        background-color: var(--primary-accent-color);
        z-index: 1;
    }

    .menu-item {
        background-color: transparent;
        position: relative;
        display: block;
        text-align: center;
        text-decoration: none;
    }

</style>

<div class="profile-button">
    <div class="menu">
        <a class="menu-item" href="/admin">Profil</a>
        <a class="menu-item" href="/logout">Abmelden</a>
    </div>
    <img src="macrosoft.png" alt="">
</div>