<script>
    import GanttChart from "$lib/components/GanttChart.svelte";
    let apartments = [
        {
            start: new Date(2023, 8, 10),
            end: new Date(2023, 9, 20),
            name: "Apartment 1"
        },
        {
            start: new Date(2023, 8, 10),
            end: new Date(2023, 9, 20),
            name: "Apartment 2"
        }
    ];

    let temp = fetch('localhost:5000/api/apartments');
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