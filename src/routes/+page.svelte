<script>
    import GanttChart from "$lib/components/GanttChart.svelte";
    let appartments = [
        {
            start: new Date(2023, 8, 10),
            end: new Date(2023, 9, 20),
            name: "Appartment 1"
        },
        {
            start: new Date(2023, 8, 10),
            end: new Date(2023, 9, 20),
            name: "Appartment 2"
        }
    ];
</script>

<style>
    * {
        font-family: 'Roboto', sans-serif;
    }
</style>

<h1>Mieterverwaltung</h1>

<div>
    <GanttChart apparments={appartments} />
</div>