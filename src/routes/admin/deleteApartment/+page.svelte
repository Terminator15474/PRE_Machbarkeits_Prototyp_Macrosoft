<script>
import Button from "$lib/components/Button.svelte";
let SearchTerm = "";
</script>

<main>
    <h1>Apartment entfernen</h1>
    <input  type="text" placeholder="Search" bind:value={SearchTerm}>
    <Button>Search</Button>
</main>



<style>

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
</style>