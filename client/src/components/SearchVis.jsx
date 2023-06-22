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
	const [NumHighlight, SetNumHighlight] = useState([0, 0, 0, 0, 0, 0, 0]);
	var temparray = [];
	var tempHighlight = [];
	async function LinearSearch() {
		for (let i = 0; i < array.length; i++) {
			temparray = CodeArray;
			tempHighlight = NumHighlight;
			temparray[0].HighLight = 1;
			temparray[1].HighLight = 0;
			temparray[4].HighLight = 0;

			tempHighlight[i - 1] = 0;
			if (i > 0) {
				document.getElementById("SearchVisNum" + (i - 1)).style.color =
					"rgba(100,100,100,1)";
			}

			tempHighlight[i] = 1;
			SetNumHighlight(tempHighlight);

			SetCodeArray(temparray);
			forceUpdate();
			await Delay(delay);
			temparray[0].HighLight = 0;
			temparray[1].HighLight = 1;

			SetCodeArray(temparray);
			forceUpdate();
			await Delay(delay);

			if (array[i] == 9) {
				temparray[1].HighLight = 0;
				temparray[2].HighLight = 1;

				SetCodeArray(temparray);
				forceUpdate();
				return array[i];
			}
			temparray[1].HighLight = 0;
			temparray[2].HighLight = 0;
			temparray[4].HighLight = 1;
			SetCodeArray(temparray);
			forceUpdate();
			await Delay(delay);
		}
	}

	return (
		<div className="SearchVis">
			<div className="SearchVisTitle">Linear Search</div>
			<div className="SearchVisNumberParent">
				{array.map((info, index) => {
					var tempColor = "rgba(0, 150, 0," + NumHighlight[index] + ")";
					return (
						<div
							className="SearchVisNumber"
							key={index}
							style={{ backgroundColor: tempColor }}
							id={"SearchVisNum" + index}
						>
							{info}
						</div>
					);
				})}
			</div>
			<div className="SearchVisInfo">
				<div className="SearchVisInfoHalf">
					The Linear Search sequentially checks each element of the list until a
					match is found or the whole list has been searched
				</div>
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
