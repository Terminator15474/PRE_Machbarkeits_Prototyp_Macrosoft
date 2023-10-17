<script lang="ts">
    let fields : String[] = [];
    let modal : HTMLDivElement;
    export function showModal(object: Object) {
        fields = Object.values(object);
        modal.classList.remove("hidden");
    }
</script>

<div class="modal hidden" bind:this={modal}>
    {#each fields as field}
        <h4>field</h4>
    {/each}
    <button>Close</button>
</div>

<style>
    .hidden {
        display: none;
    }

    .modal {
        position: absolute;
        top: 0;
        left: 0;
        width: 50vw;
        height: fit-content;

    }

    button {
        position: relative;
        align-self: center;
    }
</style>