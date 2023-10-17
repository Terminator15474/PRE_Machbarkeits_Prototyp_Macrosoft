<script lang="ts">
    import {showModal} from './InformationModal.svelte';

    export let name: String;
    export let days: {
        day: Date;
        occupied: boolean;
        tenantName: string;
        tenantId: number;
    }[] = [];

    $: console.log(days);
</script>

<div class="gantt-row">
    <div class="apartment-name">{name}</div>
    <div class="invis-name"></div>
    {#each days as day, i}
        <div role="button" tabindex="0" class="day {day.occupied ? 'occupied' : 'free'}" data-day="{day == undefined ? null : new Date(day.day).getDay()}" on:click={() => showModal(day)} on:keypress={(e) => e.key == 'Enter' ? showModal(day) : null}/>
    {/each}
</div>

<style>
    .gantt-row {
        display: flex;
        margin-bottom: var(--gantt-chart-gap);
    }

    .day {
        border: 1px solid var(--background-color);
        min-width: var(--date-day-width);
        aspect-ratio: 1/1;
        text-orientation: var(--date-day-orientation);
    }

    .occupied {
        background-color: var(--apartment-occupied);
    }

    .free {
        background-color: var(--apartment-free);
    }

    .day:nth-child(3), .day[data-day="1"] {
        margin-left: var(--gantt-chart-gap);
    }
    
    .invis-name {
        background-color: transparent;
    }

    .apartment-name, .invis-name {
        display: inline-block;
        align-items: center;
        justify-content: center;
        min-width: 12ch;
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
