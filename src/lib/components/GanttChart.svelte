<script lang="ts">
	import { afterUpdate, onMount } from "svelte";
	import GanttRow from "./GanttRow.svelte";

	export let apartments: {
		name: string;
		id: number;
	}[];

	let lowerBound: Date = new Date();
	let upperBound: Date = new Date(
		lowerBound.getTime() + 1000 * 60 * 60 * 24 * 30
	);
	let lowerBoundString: string = lowerBound.toISOString().split("T")[0];
	let upperBoundString: string = upperBound.toISOString().split("T")[0];
	let span: number = 0;
	let days: Map<
		String,
		{
			day: Date;
			occupied: boolean;
			tennantName: string;
			tennantId: number;
		}[]
	> = new Map();

	$: datesMatch = !(tmpBindLower != lowerBoundString || tmpBindUpper != upperBoundString);

	

	onMount(() => {
/*         let upperBoundElement =
			document.querySelector<HTMLInputElement>("#dateinput-2");
		if (upperBoundElement) {
			upperBoundElement.value = upperBoundString;
		}

		let lowerBoundElement =
			document.querySelector<HTMLInputElement>("#dateinput-1");
		if (lowerBoundElement) {
			lowerBoundElement.value = lowerBoundString;
		} */
		tmpBindLower = "" + lowerBoundString;
		tmpBindUpper = "" + upperBoundString;
		console.log("Called update bounds " + lowerBoundString + " " + upperBoundString);
		updateBounds();
	});

	function normalDateString(date: Date) {
		let monthString = `${date.getMonth() + 1}`.padStart(2, "0");
		let dayString = `${date.getDate()}`.padStart(2, "0");
		return `${date.getFullYear()}-${monthString}-${dayString}`;
	}

	async function getDays(id: number) {
		let url = `http://localhost:5654/api/get_occupents?apartment_id=${id}&start_date=${normalDateString(
			lowerBound
		)}&end_date=${normalDateString(upperBound)}`;
		let res = await fetch(url);
		return (await res.json()).days;
	}

	let tmpBindLower = "";
		let tmpBindUpper = "";

	async function updateBounds() {
		lowerBoundString = tmpBindLower + "";

		upperBoundString = tmpBindUpper + "";

		lowerBound = new Date(lowerBoundString);
		upperBound = new Date(upperBoundString);

 

		let tempMap: Map<
			String,
			{
				day: Date;
				occupied: boolean;
				tennantName: string;
				tennantId: number;
			}[]
		> = new Map();

		if (
			isNaN(Date.parse(lowerBoundString)) ||
			isNaN(Date.parse(upperBoundString))
		) {
			alert("Invalid date");
			return;
		}

		console.log(
			`Von: ${normalDateString(lowerBound)} to ${normalDateString(
				upperBound
			)}`
		);

		span =
			(upperBound.getTime() - lowerBound.getTime()) /
			(1000 * 60 * 60 * 24);

		for (var i = 0; i < apartments.length; i++) {
			let daysTemp = await getDays(apartments[i].id);
			tempMap.set(apartments[i].name, daysTemp);
			console.log("SET DAYS");
		}

		console.log(tempMap.get("test"));
		console.log(days.get("test"));

		days = tempMap;
	}
</script>

<div>
	Von: <input type="date" id="dateinput-1" bind:value={tmpBindLower} on:keypress={e => e.key == 'Enter' ? updateBounds() : null} />
	Bis: <input type="date" id="dateinput-2" bind:value={tmpBindUpper} on:keypress={e => e.key == 'Enter' ? updateBounds() : null} />
	{#if !datesMatch}
		<p>Update needed</p>
	{/if}
	<input type="button" value="Update" on:click={() => updateBounds()} />
	<br>
	<br>
	<div class="date-row">
		<!-- DO NOT CHANGE TEXT IF IT DOESN'T MAKE PROBLEMS -->
		<div class="apartment-name">Appartments</div>
		{#each Array(span + 1) as _, i}
			<div class="date-row-item">
				{new Date(
					lowerBound.getTime() + 1000 * 60 * 60 * 24 * i
				).toLocaleDateString()}
			</div>
		{/each}
	</div>
	{#each apartments as appartment (appartment.id)}
		{#if days.get("test") == undefined}
			<h1>{appartment.name}</h1>
		{/if}
		<GanttRow name={appartment.name} days={days.get(appartment.name)} />
	{/each}
</div>

<style>
	* {
		--date-row-week-border-radius: 5px;
	}

	input {
		border: 1px solid var(--primary-accent-color);
	}

	.date-row {
		display: grid;
		grid-auto-flow: column;
		margin-bottom: 0.5vw;
	}

	.date-row-item {
		border: 1px solid transparent;
		height: 100%;
		width: 12ch;
		text-align: center;
		background-color: var(--primary-accent-color);
		color: white;
		background-clip: content-box;
	}

	.date-row-item:nth-child(7n + 2) {
		margin-left: 0.5vw;
	}

	.date-row-item:nth-child(2) {
		border-top-left-radius: var(--date-row-week-border-radius);
		border-bottom-left-radius: var(--date-row-week-border-radius);
	}

	.date-row-item:nth-child(7n + 1) {
		border-top-right-radius: var(--date-row-week-border-radius);
		border-bottom-right-radius: var(--date-row-week-border-radius);
	}

	.date-row-item:nth-child(7n + 2) {
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