<script>
    import GanttChart from "$lib/components/GanttChart.svelte";
    /**
     * @type {any}
     */
    let apartments = [];
    (async () => {
        let response = await fetch('http://localhost:5654/api/apartments');
        let data = await response.json();
        apartments = data;
    })();
</script>

<style>
    * {
        font-family: 'Roboto', sans-serif;
    }
</style>

<h1>Mieterverwaltung</h1>

<div>
    <GanttChart apartments={apartments} />
</div>