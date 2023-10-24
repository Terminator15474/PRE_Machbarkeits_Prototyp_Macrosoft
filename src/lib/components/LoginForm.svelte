<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { post } from "$lib";
    import Button from "./Button.svelte";

    let mail = "";
    let password = "";
    async function handleSubmit() {
        let response = await post('http://localhost:5654/api/login', {email: mail, password: password});
        let data = await response.status;
        let url = $page.url.searchParams.get('redirect_to') || '/';
        if (data == 200) {
            window.location.href = url;
        } else {
            alert('Login fehlgeschlagen');
        }
    }
</script>

<main>
    <h1 class="center">login</h1>

    <input  type="text" placeholder="Mustermail@gmail.com" bind:value={mail}><br>
    
    <input  type="text" placeholder="password" bind:value={password}><br>

    <Button type="primary">submit</Button>
</main>

<style>
.center{
    display: flex;
    justify-content: center;
    align-items: center;
}

main{
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


input:hover, input:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

input:disabled {
    background-color: #eee;
    color: #999;
}

</style>