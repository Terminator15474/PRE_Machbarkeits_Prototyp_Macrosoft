<script>
    import GanttChart from "$lib/components/GanttChart.svelte";
    /**
     * @type {any}
     */
    let apartments = [];
    const fetchApartmetns = async () => {
        let response = await fetch("http://localhost:5654/api/apartments");
        let data = await response.json();
        apartments = data;
        return apartments;
    };
</script>

<style>
    .gantt-chart-wrapper {
        max-height: 50vh;
        max-width: 100vw;
        overflow: scroll;
    }
</style>

<h1>Mieterverwaltung</h1>
<div class="gantt-chart-wrapper">
    {#await fetchApartmetns()}
        <h1>Loading...</h1>
    {:then done}
        <div>
            <GanttChart {apartments} />
        </div>
    {/await}
</div>