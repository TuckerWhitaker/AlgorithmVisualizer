import "./Astar.css";
import Tile from "./Tile";
import React, { useState } from "react";

function Astar() {
	var mouseDown = 0;
	document.body.onmousedown = function () {
		++mouseDown;
	};
	document.body.onmouseup = function () {
		--mouseDown;
	};

	function Delay(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}

	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);

	let width = 25;
	let height = 14;

	let startPoint = width * (height / 2);
	let endPoint = width * (height / 2) + width - 1;
	let endPointI = height / 2;
	let endPointJ = width;

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

	function heuristic(a, b, c, d) {
		let sideA = c - a;
		let sideB = d - b;

		return Math.hypot(sideA, sideB);
	}

	for (let i = 0; i < height; i++) {
		TileArray.push([]);

		for (let j = 0; j < width; j++) {
			let iswall = false;
			if (Math.random() > 1) {
				iswall = true;
			}

			TileArray[i].push({
				I: i,
				J: j,
				ID: width * i + j,
				f: 0,
				g: 0,
				h: 0,
				OriginI: null,
				OriginJ: null,
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
					if (i > 0) {
						neighbors.push(TileArray[i - 1][j]);
					}
					if (j > 0) {
						neighbors.push(TileArray[i][j - 1]);
					}
					if (j < width - 1) {
						neighbors.push(TileArray[i][j + 1]);
					}
					if (i < height - 1) {
						neighbors.push(TileArray[i + 1][j]);
					}

					if (i > 0 && j > 0) {
						neighbors.push(TileArray[i - 1][j - 1]);
					}
					if (i < height - 1 && j < width - 1) {
						neighbors.push(TileArray[i + 1][j + 1]);
					}
					if (i < height - 1 && j > 0) {
						neighbors.push(TileArray[i + 1][j - 1]);
					}
					if (i > 0 && j < width - 1) {
						neighbors.push(TileArray[i - 1][j + 1]);
					}

					TileArray[i][j].Neighbors = neighbors;
				}

				document
					.getElementById(i * width + j)
					.addEventListener("mouseover", () => {
						if (mouseDown) {
							ClosedSet.push(TileArray[i][j].ID);
							document.getElementById(i * width + j).style.background = "#000";
						}
					});
			}
		}
	}

	async function Solve() {
		/* for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				if (TileArray[y][x].Neighbors) {
					for (let i = 0; i < TileArray[y][x].Neighbors.length; i++) {
						document.getElementById(
							TileArray[y][x].Neighbors[i].ID
						).style.backgroundColor = "#F00";
					}
					await Delay(1);
					for (let i = 0; i < TileArray[y][x].Neighbors.length; i++) {
						document.getElementById(
							TileArray[y][x].Neighbors[i].ID
						).style.backgroundColor = "#FFF";
					}
				}
			}
		}*/

		/*let start = TileArray[7][0];
		for (let i = 0; i < start.Neighbors.length; i++) {
			if (!ClosedSet.includes(start.Neighbors[i].ID)) {
				document.getElementById(start.Neighbors[i].ID).style.backgroundColor =
					"#F00";
			}
		}*/

		let IsDone = false;
		OpenSet.push(TileArray[7][0]);
		while (OpenSet.length > 0 && IsDone == false) {
			var lowestindex = 0;

			for (let i = 0; i < OpenSet.length; i++) {
				if (OpenSet[i].f < OpenSet[lowestindex].f) {
					lowestindex = i;
				}
			}
			var current = OpenSet[lowestindex];
			if (OpenSet[lowestindex].ID == endPoint) {
				console.log("DONE");
				IsDone = true;
			}

			removeFromArray(OpenSet, current);
			ClosedSet.push(current.ID);
			document.getElementById(current.ID).style.backgroundColor = "#11b821";

			var neighbors = current.Neighbors;

			for (let i = 0; i < neighbors.length; i++) {
				let neighbor = neighbors[i];

				if (!ClosedSet.includes(neighbor.ID)) {
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

						neighbor.OriginI = current.I;
						neighbor.OriginJ = current.J;

						document.getElementById(neighbor.ID).style.backgroundColor =
							"#eb1f10";
						await Delay(25);
					}
				}

				neighbor.h = heuristic(neighbor.I, neighbor.J, endPointI, endPointJ);
				neighbor.f = neighbor.g + neighbor.h;
				document.getElementById(neighbor.ID + "F").innerHTML = Math.round(
					neighbor.f
				);
			}
		}
		let nextpath = TileArray[7][24];

		for (let i = 0; i < width * height; i++) {
			document.getElementById(nextpath.ID).style.background = "#00F";
			if (nextpath.OriginI == null && nextpath.OriginJ == null) {
				i = width * height;
			} else {
				nextpath = TileArray[nextpath.OriginI][nextpath.OriginJ];
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
									f={innerinfo.f}
									g={innerinfo.g}
									h={innerinfo.h}
									OriginID={innerinfo.OriginID}
									Neighbors={innerinfo.Neighbors}
									I={innerinfo.I}
									J={innerinfo.J}
								></Tile>
							);

							return tile;
						});
					})}
				</div>
			</div>

			<div>
				<button
					className="SolveBtn"
					onClick={() => {
						Solve();
					}}
				>
					Solve
				</button>
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
