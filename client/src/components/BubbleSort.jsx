import SortVisualizer from "./SortVisualizer";
import React, { useState } from "react";

function BubbleSort() {
	function Delay(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}

	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);

	async function BSort(array, SetHighlited, SetArray, delay) {
		var Switches = 0;

		for (let x = 0; x < 100; x++) {
			for (let i = 0; i < array.length - 1; i++) {
				if (array[i] > array[i + 1]) {
					Switches++;
					let temp = array[i];
					array[i] = array[i + 1];
					array[i + 1] = temp;
					SetHighlited(i + 1);
					SetArray(array);
					await Delay(delay * 10);
					forceUpdate();
				}
			}
		}

		console.log("Switches: " + Switches);
	}

	return <SortVisualizer SortFunction={BSort}></SortVisualizer>;
}

export default BubbleSort;
