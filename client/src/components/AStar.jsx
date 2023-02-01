import "./Astar.css";
import Tile from "./Tile";
import React, { useState } from "react";

function Astar() {
	function Delay(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}

	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);

	let width = 25;
	let height = 14;

	let startPoint = width * (height / 2);
	let endPoint = width * (height / 2) + width - 1;

	let TileArray = [];
	let OpenSet = [];
	var ClosedSet = [];

	function removeFromArray(arr, element) {
		for (let i = arr.length - 1; i >= 0; i--) {
			if (arr[i] == element) {
				arr.splice(i, 1);
			}
		}
	}

	function heuristic(a, b) {
		return Math.hypot(a, b);
	}

	for (let i = 0; i < height; i++) {
		TileArray.push([]);

		for (let j = 0; j < width; j++) {
			let iswall = false;
			if (Math.random() > 0.9) {
				iswall = true;
			}

			TileArray[i].push({
				I: i,
				J: j,
				ID: width * i + j,
				Fcost: 0,
				Gcost: 0,
				Hcost: 0,
				OriginID: 0,
				IsWall: iswall,
			});
		}
	}

	async function GridSetup() {
		await Delay(1);
		//set Start And End Points

		document.getElementById(startPoint).style.background = "#8992FF";
		document.getElementById(endPoint).style.background = "#F3FF00";

		for (let i = 0; i < height; i++) {
			for (let j = 0; j < TileArray[0].length; j++) {
				if (
					TileArray[i][j].IsWall &&
					i * width + j != startPoint &&
					i * width + j != endPoint
				) {
					ClosedSet.push(TileArray[i][j].ID);
					document.getElementById(i * width + j).style.background = "#000";
				} else {
					let neighbors = [];

					if (i < height - 1) {
						neighbors.push(TileArray[i + 1][j]);
					}

					if (j < width - 1 && i < height - 1) {
						neighbors.push(TileArray[i + 1][j + 1]);
					}
					if (j > 0 && i < height - 1) {
						neighbors.push(TileArray[i + 1][j - 1]);
					}

					if (i > 0) {
						neighbors.push(TileArray[i - 1][j]);
					}

					if (i > 0 && j < width - 1) {
						neighbors.push(TileArray[i - 1][j + 1]);
					}

					if (i > 0 && j > 0) {
						neighbors.push(TileArray[i - 1][j - 1]);
					}

					if (j < width - 1) {
						neighbors.push(TileArray[i][j + 1]);
					}
					if (j > 0) {
						neighbors.push(TileArray[i][j - 1]);
					}

					TileArray[i][j].Neighbors = neighbors;
				}
			}
		}

		await Delay(1000);
		Solve();
	}

	async function Solve() {
		console.log(ClosedSet);
		OpenSet.push(TileArray[7][0]);

		await Delay(1000);

		while (OpenSet.length > 0) {
			var lowestindex = 0;

			for (let i = 0; i < OpenSet.length; i++) {
				if (OpenSet[i].f < OpenSet[lowestindex].f) {
					lowestindex = i;
				}
			}
			var current = OpenSet[lowestindex];
			if (OpenSet[lowestindex] == endPoint) {
				console.log("DONE");
			}

			removeFromArray(OpenSet, current);
			ClosedSet.push(current.ID);
			document.getElementById(current.ID).style.backgroundColor = "#11b821";

			var neighbors = current.Neighbors;

			for (let i = 0; i < neighbors.length; i++) {
				let neighbor = neighbors[i];

				if (ClosedSet.includes(neighbor.ID)) {
					var tempg = current.g + 1;
					if (
						Math.abs(neighbor.I - current.I) +
							Math.abs(neighbor.J - current.J) >
						1
					) {
						tempg = current.g + 1.5;
					}

					if (OpenSet.includes(neighbor)) {
						if (tempg < neighbor.g) {
							neighbor.g = tempg;
						}
					} else {
						neighbor.g = tempg;
						OpenSet.push(neighbor);

						document.getElementById(neighbor.ID).style.backgroundColor =
							"#eb1f10";
						await Delay(100);
					}
				} else {
				}

				neighbor.h = heuristic(neighbor, endPoint);
				neighbors.f = neighbor.g + neighbor.h;
			}
		}
	}

	GridSetup();

	return (
		<div className="AstarParent">
			<div className="AStarGridParent">
				<div className="AStarGrid" id="AStarGrid">
					{TileArray.map((info, index) => {
						return TileArray[index].map((innerinfo, innerindex) => {
							var tile = (
								<Tile
									key={index + "" + innerindex}
									ID={innerinfo.ID}
									Fcost={innerinfo.Fcost}
									Gcost={innerinfo.Gcost}
									Hcost={innerinfo.Hcost}
									OriginID={innerinfo.OriginID}
								></Tile>
							);

							return tile;
						});
					})}
				</div>
			</div>

			<div className="SetCount">
				Column Count:
				<input
					type="number"
					defaultValue={width}
					onChange={(e) => {
						let colcountcss = "";
						for (let i = 0; i < e.target.value; i++) {
							colcountcss += "auto ";
						}
						document.getElementById("AStarGrid").style.gridTemplateColumns =
							colcountcss;
					}}
				></input>
			</div>
			<input type="number" onChange={(e) => {}}></input>
		</div>
	);
}

export default Astar;
