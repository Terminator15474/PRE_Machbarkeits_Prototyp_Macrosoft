<script>

</script>

<style>
    .profile-button {
        position: relative;
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

    .profile-button:hover > .menu {
        display: flexbox;
        border: 2px solid var(--primary-accent-color);
        transform: translateY(5vh);
        transition: transform 500ms;
        z-index: 10;
    }

    .profile-button:hover > img {
        animation: image-rotate 1s ease-in-out both
    }

    @keyframes image-rotate{
        0% { transform: rotate(0deg);}
        100% { transform: rotate(360deg); border-radius: 50%;}
    }

    .menu {
        position: absolute;
        /* display: none; */
        align-self: center;
        width: fit-content;
        height: fit-content;
        background-color: var(--primary-color);
        border: 2px solid var(--primary-accent-color);
        border-radius: 10%;
        transform: translateX(-0.2vw);
    }

    .menu-item {
        position: relative;
        background-color: transparent;
        display: block;
        text-align: center;
        text-decoration: none;
    }

</style>

<div class="profile-button">
    <img src="macrosoft.png" alt="">

    <div class="menu">
        <a class="menu-item" href="/admin">Profil</a>
        <a class="menu-item" href="/logout">Abmelden</a>
    </div>
</div>