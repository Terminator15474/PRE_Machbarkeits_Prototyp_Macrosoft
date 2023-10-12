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
    };
</script>

<h1>Mieterverwaltung</h1>

{#await fetchApartmetns()}
    <h1>Loading...</h1>
{:then done}
    <div>
        <GanttChart {apartments} />
    </div>
{/await}

<style>
    * {
        font-family: "Roboto", sans-serif;
    }
</style>
