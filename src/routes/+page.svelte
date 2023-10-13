<script>
    import GanttChart from "$lib/components/GanttChart.svelte";
    import ProfileButton from "$lib/components/ProfileButton.svelte";
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

    h1 {
        width: 50%;
        overflow: hidden;
        margin: 1rem;
    }

    .top-span {
        width: 100%;
        display: flex;
        overflow-x: hidden;
        border-bottom: 2px solid var(--primary-accent-color);
        margin-bottom: 1%;
    }
    
</style>

<span class="top-span">
    <h1>Mieterverwaltung</h1>
    <ProfileButton />
</span>

<div class="gantt-chart-wrapper">
    {#await fetchApartmetns()}
        <h1>Loading...</h1>
    {:then done}
        <div>
            <GanttChart {apartments} />
        </div>
    {/await}
</div>


{#each Array(1000) as _}
<br>
{/each}