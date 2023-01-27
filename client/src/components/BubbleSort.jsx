import "./BubbleSort.css";
import React, { useState } from "react";

function BubbleSort() {
	function Delay(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}

	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);

	const [array, SetArray] = useState([]);
	const [highlighted, SetHighlited] = useState();
	const [delay, SetDelay] = useState(0);

	const GetColor = (index) => {
		if (index != highlighted) {
			return "#696969";
		} else {
			return "#a92121";
		}
	};

	async function BSort() {
		console.log("BSort");
		for (let i = 0; i < array.length - 1; i++) {
			if (array[i] > array[i + 1]) {
				let temp = array[i];
				array[i] = array[i + 1];
				array[i + 1] = temp;
				SetHighlited(i);
				i -= 2;
				SetArray(array);
				await Delay(delay * 10);
				forceUpdate();
			}
		}
		console.log("Set Array");
	}

	return (
		<div className="BubbleSort">
			<div className="Visual">
				{array.map((info, index) => {
					return (
						<div
							className="Block"
							style={{ height: info + "vh", backgroundColor: GetColor(index) }}
							key={index}
						></div>
					);
				})}
			</div>
			<div className="Settings">
				<h4>settings</h4>
				<button
					className="SettingBtn"
					onClick={() => {
						let newarray = [];
						for (let i = 0; i < 50; i++) {
							newarray.push(Math.round(Math.random() * 49) + 1);
						}
						SetArray(newarray);
						SetHighlited(0);
					}}
				>
					Randomize
				</button>
				<button
					className="SettingBtn"
					onClick={() => {
						BSort();
					}}
				>
					Sort
				</button>
				delay:
				<div id="delaydisplay">0</div>
				<input
					onInput={(e) => {
						document.getElementById("delaydisplay").innerHTML = e.target.value;
						SetDelay(e.target.value);
					}}
					type="range"
					min="0"
					max="5"
					defaultValue="0"
					class="slider"
					id="myRange"
				></input>
			</div>
		</div>
	);
}

export default BubbleSort;
