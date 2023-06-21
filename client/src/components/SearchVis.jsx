import React, { useEffect, useState } from "react";
import "./SearchVis.css";

let array = [0, 2, 3, 6, 7, 9, 15];

//let CodeArray = ["for (let i = 0; i < 10; i++){", "console.log(i);", "}"];

function Delay(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

function SearchVis() {
	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);

	const [CodeArray, SetCodeArray] = useState([
		{
			Tab: 0,
			string: "for (let i = 0; i < array.length; i++) {",
			HighLight: 0,
		},
		{ Tab: 50, string: "if (array[i] == 9) { ", HighLight: 0 },
		{ Tab: 100, string: "return array[i];", HighLight: 0 },
		{ Tab: 50, string: "}", HighLight: 0 },
		{ Tab: 0, string: "}", HighLight: 0 },
	]);

	var temparray = [];
	async function LinearSearch() {
		console.log("================================");

		for (let i = 0; i < array.length; i++) {
			temparray = CodeArray;
			temparray[0].HighLight = 1;
			temparray[1].HighLight = 0;
			temparray[2].HighLight = 0;
			temparray[4].HighLight = 0;
			SetCodeArray(temparray);
			forceUpdate();
			await Delay(1000);
			temparray[0].HighLight = 0;
			temparray[1].HighLight = 1;
			temparray[2].HighLight = 0;
			temparray[4].HighLight = 0;
			SetCodeArray(temparray);
			forceUpdate();
			await Delay(1000);
			console.log("1");
			if (array[i] == 9) {
				console.log(CodeArray);
				temparray[0].HighLight = 0;
				temparray[1].HighLight = 0;
				temparray[2].HighLight = 1;
				temparray[4].HighLight = 0;
				SetCodeArray(temparray);
				forceUpdate();

				return array[i];
			}
			temparray[0].HighLight = 0;
			temparray[1].HighLight = 0;
			temparray[2].HighLight = 0;
			temparray[4].HighLight = 1;
			SetCodeArray(temparray);
			forceUpdate();
			await Delay(1000);
		}
	}

	return (
		<div className="SearchVis">
			<div className="SearchVisTitle">Search Vis Title</div>
			<div className="SearchVisNumberParent">
				{array.map((info, index) => {
					return (
						<div className="SearchVisNumber" key={index}>
							{info}
						</div>
					);
				})}
			</div>
			<div className="SearchVisInfo">
				<div className="SearchVisInfoHalf">Description</div>
				<div className="SearchVisInfoHalf SearchVisCode">
					{CodeArray.map((info, index) => {
						var tempColor = "rgba(49, 78, 136," + info.HighLight + ")";
						return (
							<div
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
					LinearSearch();
				}}
			>
				Search
			</button>
		</div>
	);
}

export default SearchVis;
