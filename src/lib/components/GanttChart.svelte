<script lang="ts">
    import GanttRow from "./GanttRow.svelte";

    export let apartments: {
            start: Date;
            end: Date;
            name: string;
        }[];

    let lowerBound: Date = new Date();
    let upperBound: Date = new Date(lowerBound.getTime() + 1000 * 60 * 60 * 24 * 30);
    let lowerBoundString : string = lowerBound.toISOString().split("T")[0];
    let upperBoundString : string = upperBound.toISOString().split("T")[0];
    let span : number;

    function updateBounds(mock1: any, mock2: any) {
        if (isNaN(Date.parse(lowerBoundString)) || isNaN(Date.parse(upperBoundString))) {
            return;
        }
        
        lowerBound = new Date(lowerBoundString);
        upperBound = new Date(upperBoundString);
    }

    $: span = (upperBound.getTime() - lowerBound.getTime())/1000/60/60/24;
    $: updateBounds(lowerBoundString, upperBoundString)
</script>

<style>
    * {
        --date-row-week-border-radius: 5px;
    }
    .date-row {
        display: grid;
        grid-auto-flow: column;
        margin-bottom: .5vw;
    }
    
    .date-row-item {
        border: 1px solid white;
        height: 100%;
        width: 12ch;
        text-align: center;
        background-color: blue;
        color: white;
        background-clip: content-box;
        
    }

    .date-row-item:nth-child(7n+2) {
        margin-left: .5vw;
    }

    .date-row-item:nth-child(2) {
        border-top-left-radius: var(--date-row-week-border-radius);
        border-bottom-left-radius: var(--date-row-week-border-radius);
    }

    .date-row-item:nth-child(7n+1) {
        border-top-right-radius: var(--date-row-week-border-radius);
        border-bottom-right-radius: var(--date-row-week-border-radius);
    }

    .date-row-item:nth-child(7n+2) {
        border-top-left-radius: var(--date-row-week-border-radius);
        border-bottom-left-radius: var(--date-row-week-border-radius);
    }

    .apartment-name {
        width: 12ch;
        height: 100%;
        color: transparent;
        user-select: none;
    }
</style>

<div>
    Von: <input type="date" bind:value={lowerBoundString} on:keydown={(e) => {e.key == "Enter" ? updateBounds("", "") : null}}>
    Bis: <input type="date" bind:value={upperBoundString} on:keydown={(e) => {e.key == "Enter" ? updateBounds("", "") : null}}>
    <br>
    <div class="date-row">
        <!-- DO NOT CHANGE TEXT IF IT DOESN'T MAKE PROBLEMS -->
        <div class="apartment-name">Appartments</div>
        {#each Array(span+1) as _, i}
            <div class="date-row-item">
                {new Date(lowerBound.getTime() + 1000 * 60 * 60 * 24 * i).toLocaleDateString()}
            </div>
        {/each}
    </div>
    {#each apartments as apparment}
        <GanttRow {span} {...apparment} />
    {/each}
</div>