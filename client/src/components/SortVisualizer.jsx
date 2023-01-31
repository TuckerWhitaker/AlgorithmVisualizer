import "./SortVisualizer.css";
import React, { useState } from "react";

//props.SortFunction
function SortVisualizer(props) {
	function Delay(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}

	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);

	const [ElementCount, SetElementCount] = useState(50);
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

	return (
		<div className="BubbleSort">
			<div className="Visual">
				{array.map((info, index) => {
					return (
						<div
							className="Block"
							style={{
								height: info + "vh",
								width: 70 / array.length + "vw",
								backgroundColor:
									"rgb(" + info * 4 + ", " + info * 4 + ", " + info * 4 + ")",
							}}
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
						for (let i = 0; i < ElementCount; i++) {
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
						props.SortFunction(array, SetHighlited, SetArray, delay);
					}}
				>
					Sort
				</button>
				<input
					type="number"
					onChange={(e) => {
						SetElementCount(e.target.value);
					}}
					defaultValue={50}
				></input>
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
					className="slider"
					id="myRange"
				></input>
			</div>
		</div>
	);
}

export default SortVisualizer;
