<script lang="ts">
    import { beforeUpdate } from "svelte";

    export let name: string;
    export let start: Date;
    export let span: number;
    export let id: number;
    let end: Date = new Date(start.getTime() + 1000 * 60 * 60 * 24 * span);

    let response: {
         day: Date;
         occupied: boolean;
         tennantName: string;
         tennantId : number;
    }[];

    response = [];
    beforeUpdate(() => {
        let url = `http://localhost:5654/api/get_occupents?apartment_id=${1}&start_date=${start.toISOString().split("T")[0]}&end_date=${end.toISOString().split("T")[0]}`;
        console.log(url);

        (async () => {
            let res = await fetch(url);
            response = (await res.json()).days;
        })();
    });
    
</script>

<style>
    .gantt-row {
        display: grid;
        grid-auto-flow: column;
        margin-bottom: .5vw;
    }

    .day {
        border: 1px solid black;
        width: 12ch;
        aspect-ratio: 1 / 1;
    }

    .occupied {
        background-color: red;
    }

    .free {
        background-color: green;
    }

    .day:nth-child(7n+2) {
        margin-left: .5vw;
    }

    .apartment-name {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 12ch;
        height: 100%;
        text-align: center;
        border-radius: 5px;
        color: white;
        background-color: blue;
        vertical-align: middle;
    }
</style>
<div class="gantt-row">
    <div class="apartment-name">{name}</div>
    {#each Array(span+1) as _, i}
        <div class="day {response[i]?.occupied ? 'occupied' : 'free'}">
        </div>
    {/each}
</div>
