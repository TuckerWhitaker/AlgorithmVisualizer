import SortVisualizer from "./SortVisualizer";
import React, { useState } from "react";

function BogoSort() {
	function Delay(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}

	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);

	async function bogoSort(array, SetHighlited, SetArray, delay) {
		var Switches = 0;

		let count = 0;
		for (let x = 0; x < 100000; x++) {
			for (let i = 0; i < array.length / 2; i++) {
				var random1 = Math.round(Math.random() * array.length - 1);
				var random2 = Math.round(Math.random() * array.length - 1);
				var temp = array[random1];
				array[random1] = array[random2];
				array[random2] = temp;
			}
			SetArray(array);
			forceUpdate();
			await Delay(delay * 10);

			for (let i = 0; i < array.length - 1; i++) {
				if (array[i] < array[i + 1]) {
					count++;
				}
			}
			if (count == array.length) {
				x = 100000;
			}
		}

		console.log("Switches: " + Switches);
	}

	return <SortVisualizer SortFunction={bogoSort}></SortVisualizer>;
}

export default BogoSort;
