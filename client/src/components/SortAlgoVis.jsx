import { useEffect, useState } from "react";

let CodeArray = [];
function SortAlgoVis(props) {
	const [BarArray, SetBarArray] = useState([]);

	useEffect(() => {
		CodeArray = props.CodeArray;
		for (let i = 0; i < 40; i++) {
			BarArray.push(Math.floor(Math.random() * 60) + 2);
		}
		SetBarArray([...BarArray]);
	}, []);

	return (
		<div className="SortAlgoVis">
			<div className="SortAlgoVisTitle">{props.Title}</div>

			<div className="SortAlgoVisGraph">
				{BarArray.map((info, index) => {
					return (
						<div
							className="SortAlgoVisGraphBar"
							id={props.VisID + "BarArray" + index}
							key={index}
							style={{ height: info / 2 + "vh" }}
						>
							{info}
						</div>
					);
				})}
			</div>
			<div className="SortAlgoVisBottomHalf">
				<div className="SortAlgoVisDesc">{props.Description}</div>
				<div className="SortAlgoVisCode">
					{CodeArray.map((info, index) => {
						var tempColor = "rgba(49, 78, 136," + info.HighLight + ")";
						return (
							<div
								id={props.VisID + "Code" + index}
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
					props.Sort(BarArray, SetBarArray);
				}}
			>
				button
			</button>
		</div>
	);
}

export default SortAlgoVis;
