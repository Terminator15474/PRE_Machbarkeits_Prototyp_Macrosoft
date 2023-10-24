<script>
    import GanttChart from "$lib/components/GanttChart.svelte";
    import ProfileButton from "$lib/components/ProfileButton.svelte";
    import { goto } from "$app/navigation";
    
    /**
     * @type {any}
     */
    let apartments = [];

    const fetchApartments = async () => {
        let response = await fetch("http://localhost:5654/api/apartments", {
            credentials: "include",
        });

        if (response.status == 403) {
            goto("/login");
        }

        let data = await response.json();
        apartments = data;
        return apartments;
    };
</script>

<span class="top-span">
    <h1>Mieterverwaltung</h1>
    <ProfileButton />
</span>

<div class="gantt-chart-wrapper">
    {#await fetchApartments()}
        <h1>Loading...</h1>
    {:then done}
        <GanttChart {apartments} />
    {/await}
</div>

<style>
    .gantt-chart-wrapper {
        max-height: 50vh;
        max-width: 100vw;
        overflow: scroll;
    }

    h1 {
        width: fit-content;
        overflow: hidden;
        margin: 1rem;
    }

    .top-span {
        width: 100%;
        display: flex;
        justify-content: space-between;
        border-bottom: 2px solid var(--primary-accent-color);
        margin-bottom: 1%;
    }
</style>
