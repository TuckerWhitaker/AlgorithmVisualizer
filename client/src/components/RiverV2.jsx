import HeightMap from "./HeightMap.jpg";
import "./River.css";

let res = 100;

function River() {
	/*     
	
	
	Water: 
	{ 
		Direction.x: 0,
		Direction.y: 0,  
		
	}
	
	
	
	*/

	let TerrainArray = [];
	let WaterArray = [];

	const Start = () => {
		const canvas = document.getElementById("WaterCanvas");
		const ctx = document.getElementById("WaterCanvas").getContext("2d");

		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, res, res);
		for (let i = 0; i < res; i++) {
			for (let j = 0; j < res; j++) {
				let elevation = (res - j) / 1.2 + Math.random() * 2;
				TerrainArray.push({
					Index: i * res + j,
					I: i,
					J: j,
					elevation: elevation,
					isLand: true,
					DirectionX: 0,
					DirectionY: 0,
					Water: 0,
				});
				ctx.fillStyle = "rgb(" + 0 + ", " + elevation * 2.5 + ", " + 0 + ")";
				ctx.fillRect(i, j, 1, 1);
			}
		}

		let tempWaterIndexArray = [];

		TerrainArray[5010].isLand = false;
		TerrainArray[5010].Water = 0;
		WaterArray.push(5010);

		setInterval(
			() => {
				TerrainArray[5010].Water += 50;
				let Neighbors = [];
				let lowest = 10000000;
				let lowestIndex = 0;
				tempWaterIndexArray = [];
				for (let i = 0; i < WaterArray.length; i++) {
					let currentTerrain = TerrainArray[WaterArray[i]];

					if (
						currentTerrain.DirectionX == 0 &&
						currentTerrain.DirectionY == 0
					) {
						currentTerrain.elevation *= 1.001;
						currentTerrain.Water *= 0.999;
					}

					if (currentTerrain.Water > 10) {
						if (WaterArray[i] < res * res - 1) {
							Neighbors.push(TerrainArray[WaterArray[i] + 1]);
						}
						if (WaterArray[i] > 1) {
							Neighbors.push(TerrainArray[WaterArray[i] - 1]);
						}
						if (WaterArray[i] < res * res - res) {
							Neighbors.push(TerrainArray[WaterArray[i] + res]);
						}
						if (WaterArray[i] > res) {
							Neighbors.push(TerrainArray[WaterArray[i] - res]);
						}

						for (let j = 0; j < Neighbors.length; j++) {
							if (Neighbors[j].elevation + Neighbors[j].Water < lowest) {
								lowest = Neighbors[j].elevation + Neighbors[j].Water;
								lowestIndex = Neighbors[j].Index;
							}
						}

						if (TerrainArray[lowestIndex].Water < 1) {
							tempWaterIndexArray.push(lowestIndex);
							TerrainArray[lowestIndex].DirectionX =
								TerrainArray[lowestIndex].I - currentTerrain.I;
							TerrainArray[lowestIndex].DirectionY =
								TerrainArray[lowestIndex].J - currentTerrain.J;
						}

						TerrainArray[lowestIndex].Water += 5;
						currentTerrain.Water -= 5;

						let speed = 0;
						let SedimentSize = speed;
						let SedimentI = currentTerrain.I;
						let SedimentJ = currentTerrain.J;
						let lasttile = 0;

						for (let l = 0; l < Neighbors.length; l++) {
							if (Neighbors[l].elevation > 50 && Math.random() > 0.9999) {
								speed = Math.round(
									(currentTerrain.DirectionX + currentTerrain.DirectionY) / 2
								);

								lasttile = currentTerrain;
								Neighbors[l].elevation -= speed;
								SedimentSize = speed / 2;
								SedimentI = currentTerrain.I;
								SedimentJ = currentTerrain.J;

								while (speed > SedimentSize) {
									SedimentI += lasttile.DirectionX;
									SedimentJ += lasttile.DirectionY;
									lasttile =
										TerrainArray[
											Math.round(SedimentI) * res + Math.round(SedimentJ)
										];
									speed = Math.round(
										(lasttile.DirectionX + lasttile.DirectionY) / 2
									);
								}
								lasttile.elevation += SedimentSize;
								//console.log("deposition");
							}
						}
					}
					ctx.fillStyle =
						"rgb(" +
						0 +
						", " +
						TerrainArray[WaterArray[i]].elevation * 2.5 +
						", " +
						TerrainArray[WaterArray[i]].Water * 5 +
						")";
					/*
					ctx.fillStyle =
						"rgb(" +
						Math.abs(TerrainArray[WaterArray[i]].DirectionX) * 255 +
						", " +
						0 +
						", " +
						Math.abs(TerrainArray[WaterArray[i]].DirectionY) * 255 +
						")";
					*/

					ctx.fillRect(
						TerrainArray[WaterArray[i]].I,
						TerrainArray[WaterArray[i]].J,
						1,
						1
					);
				}
				WaterArray = [...WaterArray, ...tempWaterIndexArray];

				for (let k = res - 1; k < res * res; k += res) {
					if (TerrainArray[k].Water > 1) {
						TerrainArray[k].Water -= 1;
					}
					ctx.fillStyle = "#FF0000";
					ctx.fillRect(TerrainArray[k].I, TerrainArray[k].J, 1, 1);
				}
			},

			0
		);
		console.log("End");
	};

	return (
		<div className="River">
			<canvas id="WaterCanvas" width={res} height={res}></canvas>
			<button
				onClick={() => {
					Start();
				}}
			>
				Start
			</button>
		</div>
	);
}

export default River;
