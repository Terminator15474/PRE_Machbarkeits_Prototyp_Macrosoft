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

<h1>Benutzer anlegen</h1>

<input type="text" bind:value={username}>
<input type="text" bind:value={email}>

<Button on:click={submit}>submit</Button>
