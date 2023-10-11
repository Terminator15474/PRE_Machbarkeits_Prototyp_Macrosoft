<script lang="ts">
    import { beforeUpdate } from "svelte";

    export let name: string;
    export let id: number;

    export let days: {
         day: Date;
         occupied: boolean;
         tennantName: string;
         tennantId : number;
    }[] = [];
    
</script>

<style>
    .gantt-row {
        display: grid;
        grid-auto-flow: column;
        margin-bottom: .5vw;
    }

    .day {
        border: 1px solid black;
        width: 12ch;
        aspect-ratio: 1 / 1;
    }

    .occupied {
        background-color: red;
    }

    .free {
        background-color: green;
    }

    .day:nth-child(7n+2) {
        margin-left: .5vw;
    }

    .apartment-name {
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
    <div class="apartment-name">{name}</div>
    {#each days as day, i}
        <div class="day {day.occupied ? 'occupied' : 'free'}">
        </div>
    {/each}
</div>
