<script lang="ts">
	import { afterUpdate, onMount } from "svelte";
	import GanttRow from "./GanttRow.svelte";
	import InformationModal from "./InformationModal.svelte";

	export let apartments: {
		name: string;
		id: number;
	}[];
	let updatingBounds = false;

	let lowerBound: Date = new Date();
	let upperBound: Date = new Date(
		lowerBound.getTime() + 1000 * 60 * 60 * 24 * 60
	);
	let lowerBoundString: string = lowerBound.toISOString().split("T")[0];
	let upperBoundString: string = upperBound.toISOString().split("T")[0];
	let span: number = 0;
	let days: Map<
		String,
		{
			day: Date;
			occupied: boolean;
			tenantName: string;
			tenantId: number;
		}[]
	> = new Map();

	$: datesMatch = !(
		tmpBindLower != lowerBoundString || tmpBindUpper != upperBoundString
	);

	onMount(() => {
		tmpBindLower = "" + lowerBoundString;
		tmpBindUpper = "" + upperBoundString;

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
		let res = await fetch(url, {
			credentials: "include",
		});
		return (await res.json()).days;
	}

	let tmpBindLower = "";
	let tmpBindUpper = "";

	async function updateBounds() {
		let prevLowerBoundString = lowerBoundString + "";
		let prevUpperBoundString = upperBoundString + "";
		lowerBoundString = tmpBindLower + "";

		upperBoundString = tmpBindUpper + "";

		lowerBound = new Date(lowerBoundString);
		upperBound = new Date(upperBoundString);

		let tempMap: Map<
			String,
			{
				day: Date;
				occupied: boolean;
				tenantName: string;
				tenantId: number;
			}[]
		> = new Map();

		if (
			isNaN(Date.parse(lowerBoundString)) ||
			isNaN(Date.parse(upperBoundString))
		) {
			alert("Ungültiges Datum! Bitte überprüfen Sie Ihre Eingabe.");
			upperBoundString = prevUpperBoundString;
			lowerBoundString = prevLowerBoundString;
			lowerBound = new Date(lowerBoundString);
			upperBound = new Date(upperBoundString);
			tmpBindLower = lowerBoundString + "";
			tmpBindUpper = upperBoundString + "";
			return;
		}

		span =
			(upperBound.getTime() - lowerBound.getTime()) /
			(1000 * 60 * 60 * 24);

		for (var i = 0; i < apartments.length; i++) {
			let daysTemp = await getDays(apartments[i].id);
			tempMap.set(apartments[i].name, daysTemp);
		}
		days = tempMap;
	}
	$: console.log(days.get("test"));

	$: numRows = apartments.length;
	$: document.documentElement.style.setProperty(
		"--number-rows",
		"" + numRows
	);
</script>

<div>
	<div class="date-input">
		Von: <input
			type="date"
			id="dateinput-1"
			bind:value={tmpBindLower}
			on:keypress={(e) => (e.key == "Enter" ? updateBounds() : null)}
		/>
		Bis:
		<input
			type="date"
			id="dateinput-2"
			bind:value={tmpBindUpper}
			on:keypress={(e) => (e.key == "Enter" ? updateBounds() : null)}
		/>
		<input
			type="button"
			value="Update"
			class={`${!datesMatch ? "red" : ""}`}
			on:click={() => updateBounds()}
		/>
	</div>

	<br />
	<br />
	<div class="date-row">
		<div class="apartment-name" />
		<div class="invis" />
		{#each Array(span + 1) as _, i}
			<div
				class="date-row-item"
				data-day={new Date(
					lowerBound.getTime() + 1000 * 60 * 60 * 24 * i
				).getDay()}
			>
				{new Date(
					lowerBound.getTime() + 1000 * 60 * 60 * 24 * i
				).toLocaleDateString()}
			</div>
		{/each}
	</div>
	{#each apartments as apartment (apartment.id)}
		{#if days.get("test") == undefined}
			<h1>{apartment.name}</h1>
		{/if}
		<GanttRow name={apartment.name} days={days.get(apartment.name)} />
	{/each}
</div>

<style>
	* {
		--date-row-week-border-radius: 5px;
		--date-day-width: 1.5em;
		--date-day-orientation: vertical-lr;
		--gantt-chart-gap: max(5px, 0.5vw);
	}

	input {
		border: 1.6px solid var(--primary-accent-color);
		margin-inline: 0.25vw;
	}

	.red {
		background-color: red;
	}

	.date-row {
		display: flex;
		margin-bottom: var(--gantt-chart-gap);
	}

	.date-row-item {
		position: relative;
		border: 1px solid transparent;
		height: 12ch;
		min-width: var(--date-day-width);
		text-align: center;
		background-color: var(--primary-accent-color);
		writing-mode: var(--date-day-orientation);
		color: white;
		background-clip: content-box;
		text-align: center;
		vertical-align: middle;
	}

	.date-row-item:nth-child(3),
	.date-row-item[data-day="1"] {
		margin-left: var(--gantt-chart-gap);
	}

	.date-row-item:nth-child(3),
	.date-row-item[data-day="1"] {
		border-top-left-radius: var(--date-row-week-border-radius);
		border-bottom-left-radius: var(--date-row-week-border-radius);
	}

	.date-row-item[data-day="0"] {
		border-top-right-radius: var(--date-row-week-border-radius);
		border-bottom-right-radius: var(--date-row-week-border-radius);
	}

	.apartment-name {
		position: absolute;
		min-width: 12ch;
		min-height: calc(
			12ch + (3ch + var(--gantt-chart-gap)) * var(--number-rows)
		);
		border: 2px solid var(--background-color);
		background-color: var(--background-color);
		user-select: none;
		z-index: 2;
	}

	.invis {
		min-width: 12ch;
		height: 100%;
	}

	.date-input {
		position: absolute;
		display: flex;
	}
</style>
