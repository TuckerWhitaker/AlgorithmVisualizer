import React, { useEffect, useState } from "react";
import "./SearchVis.css";

/*

grayout function
SetHighlight function


*/

let array = [0, 2, 3, 6, 7, 9, 15];
let delay = 500;

function Delay(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

function SearchVis(props) {
	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);

	let CodeHighlightIndex = 0;
	let NumberHighlightIndex = 0;

	function HighLightCode(newHighlight) {
		document.getElementById("Code" + CodeHighlightIndex).style.backgroundColor =
			"rgba(49, 78, 136, 0)";
		document.getElementById("Code" + newHighlight).style.backgroundColor =
			"rgba(49, 78, 136, 1)";
		CodeHighlightIndex = newHighlight;
	}

	function GrayOutNumber(number) {
		document.getElementById("SearchVisNum" + number).style.color =
			"rgba(100,100,100,1)";
	}

	function HighLightNumber(newHighlight) {
		/*document.getElementById("SearchVisNum" + (i - 1)).style.color =
				"rgba(100,100,100,1)";*/

		document.getElementById(
			"SearchVisNum" + NumberHighlightIndex
		).style.backgroundColor = "rgba(49, 78, 136, 0)";
		document.getElementById(
			"SearchVisNum" + newHighlight
		).style.backgroundColor = "rgba(0, 150, 0, 1)";
		NumberHighlightIndex = newHighlight;
	}

	return (
		<div className="SearchVis">
			<div className="SearchVisTitle">{props.Title}</div>
			<div className="SearchVisNumberParent">
				{array.map((info, index) => {
					return (
						<div
							className="SearchVisNumber"
							key={index}
							style={{ backgroundColor: "rgba(0, 150, 0, 0)" }}
							id={"SearchVisNum" + index}
						>
							{info}
						</div>
					);
				})}
			</div>
			<div className="SearchVisInfo">
				<div className="SearchVisInfoHalf">{props.Description}</div>
				<div className="SearchVisInfoHalf SearchVisCode">
					{props.CodeArray.map((info, index) => {
						var tempColor = "rgba(49, 78, 136," + info.HighLight + ")";
						return (
							<div
								id={"Code" + index}
								className="CodeLine"
								key={index}
								style={{ marginLeft: info.Tab, backgroundColor: tempColor }}
							>
								{info.string}
							</div>
						);
					})}
				</div>
			</div>
			<button
				onClick={() => {
					//LinearSearch();
					props.SearchFunction(
						array,
						Delay,
						delay,
						HighLightCode,
						HighLightNumber,
						GrayOutNumber
					);
				}}
			>
				Search
			</button>
		</div>
	);
}

export default SearchVis;
