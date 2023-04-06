import React, { useState } from "react";
import "./MergeSort.css";

function MergeSort() {
	function Delay(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}

	const [ArrayToSort, SetArrayToSort] = useState([]);

	function merge(left, right) {
		let array = [];
		while (left.length && right.length) {
			if (left[0] < right[0]) {
				array.push(left.shift());
			} else {
				array.push(right.shift());
			}
			console.log("O");

			console.log([...array, ...left, ...right]);
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

	return (
		<div className="MergeSort">
			<div id="SortedArray">
				{ArrayToSort.map((info, index) => {
					return (
						<span
							style={{
								height: info + "vh",
								width: 50 / ArrayToSort.length + "vw",
								backgroundColor:
									"rgb(" + info * 2 + ", " + info * 2 + ", " + info * 2 + ")",
							}}
							key={index}
						>
							{info},
						</span>
					);
				})}
			</div>
			<input
				onChange={(e) => {
					SetArrayToSort(e.target.value);
				}}
			></input>
			<button
				onClick={() => {
					SetArrayToSort(mergeSort(ArrayToSort));
				}}
			>
				Sort
			</button>

			<button
				onClick={() => {
					let temparray = [];
					for (let i = 0; i < 25; i++) {
						temparray.push(Math.round(Math.random() * 100));
					}
					SetArrayToSort(temparray);
				}}
			>
				Randomize
			</button>
		</div>
	);
}

export default MergeSort;
