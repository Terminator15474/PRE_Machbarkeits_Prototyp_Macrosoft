<script>
    import Button from "$lib/components/Button.svelte";
    let email = "";
    let password = "";
</script>




<main>
    <h1 class="center">login</h1>

    <input  type="text" placeholder="Mustermail@gmail.com" bind:value={email}><br>
    
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