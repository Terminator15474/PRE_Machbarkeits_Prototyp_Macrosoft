<script lang="ts" context="module">
    let keys: String[] = [];
    let values : Object[] = [];

    let modal : HTMLDivElement;

    function showModal(object: Object) {
        keys = Object.keys(object);
        values = Object.values(object);
        modal.classList.remove("hidden");
    }
    export {showModal};
</script>

<div class="modal hidden" bind:this={modal}>
    {#each keys as key}
        <p>{key}</p>
    {/each}
    <button on:click={() => modal.classList.add("hidden")}>Close</button>
</div>

<style>
    * {
        --modal-width: 25vw;
    }

    .hidden {
        display: none !important;
    }

    .modal {
        display: flex;
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