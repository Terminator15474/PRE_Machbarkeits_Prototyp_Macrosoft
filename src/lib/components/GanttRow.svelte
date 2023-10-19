<script lang="ts">
    import DayComponent from "./DayComponent.svelte";
import InformationModal from "./InformationModal.svelte";

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
        <DayComponent {day} />
    {/each}
</div>

<style>
    .gantt-row {
        display: flex;
        margin-bottom: var(--gantt-chart-gap);
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
        z-index: 3;
        transform: translateY(-1px);
    }
</style>
