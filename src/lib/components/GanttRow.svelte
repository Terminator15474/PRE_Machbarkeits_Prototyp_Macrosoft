<script lang="ts">

    export let name: String;
    export let days: {
        day: Date;
        occupied: boolean;
        tenantName: string;
        tenantId: number;
    }[] = [];

    console.log(`Days: ${days}`);
</script>

<div class="gantt-row">
    <div class="apartment-name">{name}</div>
    <div class="invis-name"></div>
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
        border: 1px solid var(--background-color);
        width: 12ch;
        aspect-ratio: 4 / 1;
    }

    .occupied {
        background-color: var(--apartment-occupied);
    }

    .free {
        background-color: var(--apartment-free);
    }

    .day:nth-child(7n + 3) {
        margin-left: 0.5vw;
    }
    .invis-name {
        background-color: transparent;
    }

    .apartment-name, .invis-name {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 12ch;
        aspect-ratio: 4 / 1;
        text-align: center;
        vertical-align: middle;
    }

    .apartment-name {
        position: absolute;
        border: 2px solid black;
        border-radius: 5px;
        color: white;
        background-color: var(--primary-accent-color);
    }
</style>
