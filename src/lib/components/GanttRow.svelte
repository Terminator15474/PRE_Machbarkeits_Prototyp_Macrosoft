<script lang="ts">

    export let name: String;
    export let days: {
        day: Date;
        occupied: boolean;
        tennantName: string;
        tennantId: number;
    }[] = [];

    console.log(`Days: ${days}`);
</script>

<div class="gantt-row">
    <div class="apartment-name">{name}</div>
    {#each days as day, i}
        <div class="day {day.occupied ? 'occupied' : 'free'}" />
    {/each}
</div>

<style>
    .gantt-row {
        display: grid;
        grid-auto-flow: column;
        margin-bottom: 0.5vw;
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

    .day:nth-child(7n + 2) {
        margin-left: 0.5vw;
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
