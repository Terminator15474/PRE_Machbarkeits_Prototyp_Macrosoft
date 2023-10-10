<script lang="ts">
    export let name: string;
    export let span: number;
</script>

<style>
    .gantt-row {
        display: grid;
        grid-auto-flow: column;
        margin-bottom: 5px;
    }

    .day {
        border: 1px solid black;
        width: calc(12 * 8px);
        aspect-ratio: 1 / 1;
        background-color: red;
    }

    .day:nth-child(7n+2) {
        margin-left: 0%;
    }

    .appartment-name {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 12ch;
        height: 100%;
        text-align: center;
        border-radius: 5px;
        color: white;
        background-color: blue;
        vertical-align: middle;
    }
</style>
<div class="gantt-row">
    <div class="appartment-name">{name}</div>
    {#each Array(span+1) as _, i}
        <div class="day">
        </div>
    {/each}
</div>
