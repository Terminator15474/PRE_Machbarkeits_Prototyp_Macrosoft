<script>
    import GanttChart from "$lib/components/GanttChart.svelte";
    let apartments = [
        {
            id: 0,
            start: new Date(2023, 8, 10),
            end: new Date(2023, 9, 20),
            name: "Couldn't reach server"
        },
        {
            id: 1,
            start: new Date(2023, 8, 10),
            end: new Date(2023, 9, 20),
            name: "Please start the server"
        }
    ];
    (async () => {
        let response = await fetch('http://localhost:5654/api/apartments');
        let data = await response.json();
        apartments = data;
        console.log(apartments)
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