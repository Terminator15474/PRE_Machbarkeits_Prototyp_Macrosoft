<script lang="ts">
    export let visible = false;
    export let day: {
        day: Date;
        occupied: boolean;
        tenantName: string;
        tenantId: number;
    };
    
    $: keys = Object.keys(day);
    $: values = Object.values(day);

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
        {#each keys as key, i}
            <div>{key}: {values[i]}</div>
        {/each}
        <button on:click={() => {visible = false}}>Close</button>
    </div>
</div>

<style>
    * {
        --modal-width: 25vw;
    }

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
        position: absolute;
        width: var(--modal-width);
        height: 50vh;
        background-color: var(--background-color);
        border: 2px solid var(--primary-accent-color);
        margin-inline: calc( ( 100vw - var(--modal-width) ) / 2);
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
</style>