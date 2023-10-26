<script lang="ts">
    export let visible = false;
    export let day: {
        day: string;
        occupied: boolean;
        tenantName: string;
        tenantId: number;
    };
    export let apartmentName: string;

    let modal : HTMLDivElement;
    $: if (visible && modal !== undefined && modal !== null) {
        modal.style.display = "block";
    } else {
        if(modal !== undefined && modal !== null) {
            modal.style.display = "none";
        }
    }
</script>

<div class="wrapper" bind:this={modal}>
    <div class="modal">
        <div class="header">{apartmentName}: {new Date(day.day).toLocaleDateString()}</div>
        <br>
        {#if day.occupied}
            <div class="tenant-name">{day.tenantName}</div>
            
        {/if}

        <button on:click={() => {visible = false}}>Close</button>
    </div>
</div>

<style>
    .wrapper {
        position: absolute;
        top: 0;
        left: 0;
        display: none;
        flex-direction: column;
        position: fixed;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 4;
    }

    .modal {
        display: flex;
        flex-direction: column;
        position: relative;
        width: fit-content;
        margin: auto;
        padding-inline: 5vw;
        height: 50vh;
        background-color: var(--background-color);
        border: 2px solid var(--primary-accent-color);
        top: 25vh;
        align-items: center;
    }

    button {
        border: 1px solid var(--primary-accent-color);
        height: fit-content;
        position: relative;
        margin-inline: auto;
        margin-top: auto;
        margin-bottom: 0.5vh;
        border-radius: 10%;
        bottom: 0;
    }

    .header {
        font-size: 1.5em;
        font-weight: bold;
        margin-bottom: 1vh;
    }
</style>