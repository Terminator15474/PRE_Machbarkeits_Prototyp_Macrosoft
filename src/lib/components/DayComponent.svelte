<script lang="ts">
    import InformationModal from "./InformationModal.svelte";

    export let day: {
        day: Date;
        occupied: boolean;
        tenantName: string;
        tenantId: number;
    };
    let showModal = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div role="button" tabindex="0" class="day {day.occupied ? 'occupied' : 'free'}" data-day="{day == undefined ? null : new Date(day.day).getDay()}" on:click={() => {showModal=!showModal}}>
</div>
<InformationModal visible={showModal} {day} />


<style>
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
</style>