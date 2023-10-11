<script>
    import AdminListItem from "$lib/components/AdminListItem.svelte";
    let namen = ["benutzer anlegen", "apartment hinzufügen", "apartment entfernen", "bearbeiten"];
</script>

<style>
      * {
        font-family: 'Roboto', sans-serif;
    }
</style>

<h1> Administrator</h1>

<div>
    {#each namen as name  }
        <AdminListItem {name}/> 
    {/each}
    
</div>