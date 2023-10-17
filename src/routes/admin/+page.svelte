<script lang="ts">
    import { goto } from "$app/navigation";

    let namen = ["benutzer anlegen", "apartment hinzufügen", "apartment entfernen", "bearbeiten"];
    
  
  
    
  </script>
  
  <!-- Svelte-Template -->
  <main>
  
    <ul>
     <li><button on:click={() => goto("admin/newUser/")}>benutzer anlegen</button></li> 
     <li><button on:click={() => goto("admin/newApartment")}>apartment hinzufügen</button></li>
     <li><button on:click={() => goto("admin/deleteApartment")}>apartment entfernen</button></li>
     <li><button on:click={() => goto("admin/edit")}>bearbeiten</button></li>
    </ul>
  </main>
  
  <style>
    /* Hier kannst du dein CSS für die Liste und den Titel hinzufügen */
  </style>
  