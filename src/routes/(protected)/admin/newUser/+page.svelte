<script>
       import Button from "$lib/components/Button.svelte";
       
       let username = "";
       let email = "";
    async function submit(){
            let result = await fetch("http://localhost:5654/api/create_user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username, email: email
                })
            });
            console.log(result);
       }
</script>   

<main>
    <h1>Benutzer anlegen</h1>

<input type="text" placeholder="Username" bind:value={username}><br>
<input type="text" placeholder="Mustermail@gmail.com"  bind:value={email}><br>

<Button on:click={submit}>submit</Button>
</main>


<style>

    main{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25ch;   
    }


    input{
        width: 20%;
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    }
</style>
