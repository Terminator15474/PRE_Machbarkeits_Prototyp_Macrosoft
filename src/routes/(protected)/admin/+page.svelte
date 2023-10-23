<script lang="ts">
    import { goto } from "$app/navigation";
    import Button from "$lib/components/Button.svelte";
    

    let namen = ["benutzer anlegen", "apartment hinzufügen", "apartment entfernen", "bearbeiten"];
    
  
  
    
  </script>
  
  <!-- Svelte-Template -->
  <main>
  
    <ul>
     <li><Button type="primary" on:click={() => goto("admin/newUser/")}>benutzer anlegen</Button></li> 
     <li><Button type="primary" on:click={() => goto("admin/newApartment")}>apartment hinzufügen</Button></li>
     <li><Button type="primary" on:click={() => goto("admin/deleteApartment")}>apartment entfernen</Button></li>
     <li><Button type="primary" on:click={() => goto("admin/edit")}>bearbeiten</Button></li>
    </ul>
  </main>
  
  <style>
    li{
      margin-bottom: 10px;
    }

    

    main{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 25ch;
}
  </style>
  