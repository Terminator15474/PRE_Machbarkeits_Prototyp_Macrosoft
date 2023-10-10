<script>
    import GanttChart from "./GanttChart.svelte";
    let appartments = [
        {
            dateStart: new Date(2023, 8, 10),
            dateEnd: new Date(2023, 9, 20)
        },
        {
            dateStart: new Date(2023, 8, 10),
            dateEnd: new Date(2023, 9, 20)
        }
    ];

</script>

<h1>Mieterverwaltung</h1>

<GanttChart apartments={appartments} />
