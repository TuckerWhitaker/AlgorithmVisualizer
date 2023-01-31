import "./Astar.css";
import Tile from "./Tile";
import React, { useState } from "react";

function Astar() {
	let width = 25;
	let height = 13;

	let TileArray = [];

	for (let i = 0; i < width; i++) {
		TileArray.push([]);

		for (let j = 0; j < height; j++) {
			TileArray[i].push({
				ID: i * width + j,
				Fcost: 0,
				Gcost: 0,
				Hcost: 0,
				OriginID: 0,
			});
		}
	}

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
