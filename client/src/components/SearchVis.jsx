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
						CodeHighlightIndex,
						forceUpdate,
						Delay,
						delay
					);
				}}
			>
				Search
			</button>
		</div>
	);
}

export default SearchVis;
