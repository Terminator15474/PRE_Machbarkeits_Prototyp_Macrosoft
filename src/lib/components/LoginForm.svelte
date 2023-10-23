<script>

</script>

<style>
    .wrapper {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        position: fixed;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 5;
        align-items: center;
        justify-content: center;
    }

    .login-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: fit-content;
        padding-inline: 25px;
        height: 60vh;
    }

    .input-wrapper {
        display: flex;
        width: fit-content;
        margin-inline: auto;
    }

    .description {
        width: 12ch;
    }
</style>

<div class="wrapper">
    <div class="login-form">
        <h2>Login</h2>

        <div class="input-wrapper">
            <div class="description">
                Email
            </div>
            <input type="email" name="email" id="email">
        </div>
        <div class="input-wrapper">
            <div class="description">
                Passwort:
            </div>
            <input type="password" name="password" id="password">
        </div>
    </div>
</div>