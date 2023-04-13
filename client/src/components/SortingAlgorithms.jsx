import React, { useState } from "react";
import "./SortingAlgorithms.css";

function SortingAlgorithms() {
	let starttime = 0;

	async function play(frequency = 300, duration = 1e3) {
		const context = new AudioContext();
		const gainNode = context.createGain();
		const oscillator = context.createOscillator();
		oscillator.frequency.value = frequency;
		oscillator.connect(gainNode);
		gainNode.connect(context.destination);
		oscillator.start(0);
		setTimeout(() => oscillator.stop(), duration);
	}

	function Delay(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}
	const [DisplayArray, SetDisplayArray] = useState([1]);
	const [ArrayLength, SetArrayLength] = useState(50);

	function End(time) {
		console.log((time - starttime) / 1000 + " seconds");
	}
	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);

	/*

	function merge(left, right) {
		let array = [];
		while (left.length && right.length) {
			if (left[0] < right[0]) {
				array.push(left.shift());
			} else {
				array.push(right.shift());
			}
		}
		return [...array, ...left, ...right];
	}

	function mergeSort(array) {
		const mid = array.length / 2;
		if (array.length < 2) {
			return array;
		}
		const left = array.splice(0, mid);
		return merge(mergeSort(left), mergeSort(array));
	}
*/

	function HighlightPivot(index) {
		document.getElementById("SAVB" + index).style.backgroundColor =
			"rgb(255, 0, 0)";
	}
	async function swap(arr, a, b) {
		//console.log("ARR" + arr[a]);
		//play(arr[a], 100);
		//play(arr[b], 500);
		await Delay(1);
		forceUpdate();
		let temp = arr[a];
		arr[a] = arr[b];
		arr[b] = temp;
	}

	async function partition(arr, start, end) {
		let pivotIndex = start;

		let pivotValue = arr[end];
		//HighlightPivot(pivotIndex);
		for (let i = start; i < end; i++) {
			if (arr[i] < pivotValue) {
				await swap(arr, i, pivotIndex);
				pivotIndex++;
			}
		}

		await swap(arr, pivotIndex, end);
		return pivotIndex;
	}

	async function quickSort(arr, start, end) {
		if (start > arr.length - 2) {
			console.log("QuickSort End");
			End(Date.now());
		}
		if (start >= end) {
			return;
		}
		let index = await partition(arr, start, end);
		await quickSort(arr, start, index - 1);
		await quickSort(arr, index + 1, end);
	}

	return (
		<div className="SortingAlgorithms">
			Sorting Algorithms
			<div className="SA_Visualizer">
				{DisplayArray.map((info, index) => {
					let color = "rgb(" + info + ", " + info + ", " + info + ")";

					return (
						<span
							id={"SAVB" + index}
							className="SA_VisualizerBlock"
							key={index}
							style={{
								height: info / 1 + "px",
								width: "1px",
								backgroundColor: color,
							}}
						></span>
					);
				})}
			</div>
			<div className="SA_ButtonPanel">
				<button
					onClick={() => {
						let temparray = [];
						for (let i = 0; i < ArrayLength; i++) {
							temparray.push(Math.round(Math.random() * 255));
						}
						SetDisplayArray(temparray);
					}}
				>
					Randomize
				</button>
				<button
					onClick={() => {
						//SetDisplayArray(mergeSort(DisplayArray));
						//mergeSort(DisplayArray);
					}}
				>
					Merge
				</button>
				<button
					onClick={() => {
						starttime = Date.now();
						quickSort(DisplayArray, 0, DisplayArray.length - 1);
					}}
				>
					QuickSort
				</button>
				<button
					onClick={() => {
						play(100, 1000);
					}}
				>
					Play sound
				</button>
				<input
					placeholder={ArrayLength}
					onChange={(e) => {
						SetArrayLength(e.target.value);
					}}
				></input>
			</div>
		</div>
	);
}

export default SortingAlgorithms;
