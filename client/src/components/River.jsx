import HeightMap from "./HeightMap.jpg";
import "./River.css";
/*
{
	Index: 0;
	MaxCapacity: 100; //determined by depth?
	Water: 0;
}*/

let res = 100;

function River() {
	let WaterTransferRate = 50;
	let TerrainArray = [];
	let WaterIndexArray = [];

	let iswall = false;
	const Start = () => {
		const canvas = document.getElementById("WaterCanvas");
		const ctx = document.getElementById("WaterCanvas").getContext("2d");

		const image = new Image();
		image.src = HeightMap;

		image.onload = () => {
			console.log("Loaded");
			// Draw the image to the canvas
			canvas.width = image.width;
			canvas.height = image.height;
			ctx.drawImage(image, 0, 0, image.width, image.height);

			// Get the image data
			const imageData = ctx.getImageData(0, 0, image.width, image.height);
			const data = imageData.data;

			// Iterate over every pixel
			//for (let i = 0; i < data.length; i += 4) {
			//	data[i]; // red
			//}

			// Update the canvas with the grayscaled image
			//ctx.putImageData(imageData, 0, 0);

			ctx.fillStyle = "#000000";
			ctx.fillRect(0, 0, res, res);
			for (let i = 0; i < res; i++) {
				for (let j = 0; j < res; j++) {
					iswall = false;
					let elevation = 200 - data[(i * res + j) * 4];
					//let elevation = 10 + Math.random();
					//res - j

					if (i == res - 1 || j == res - 1 || i == 0 || j == 0) {
						iswall = true;
						console.log("ISWALL");
					}

					TerrainArray.push({
						WaterLastFrame: 0,
						Sediment: 0,
						Speed: 0,
						isWall: iswall,
						Depth: res - elevation,
						Elevation: elevation,
						Water: 0,
						I: i,
						J: j,
					});

					ctx.fillStyle = "rgb(" + 0 + ", " + elevation * 1 + ", " + 0 + ")";

					//ctx.fillStyle = "#00ff00";

					ctx.fillRect(i, j, 1, 1);
				}
			}

			let tempWaterIndexArray = [];

			WaterIndexArray.push(150);
			TerrainArray[150].Water = 10;

			setInterval(
				() => {
					TerrainArray[150].Water += 90;
					tempWaterIndexArray = [];
					for (let j = 0; j < WaterIndexArray.length; j++) {
						let CurrentWater = TerrainArray[WaterIndexArray[j]];

						if (CurrentWater.Sediment > 0 && CurrentWater.Speed <= 10) {
							CurrentWater.Sediment -= 1;
							CurrentWater.elevation += 1;
							CurrentWater.Depth -= 1;
						}

						if (
							CurrentWater.Water >= WaterTransferRate * 2 &&
							TerrainArray[WaterIndexArray[j]].isWall != true
						) {
							let Neighbors = [];
							Neighbors.push({
								Depth: TerrainArray[WaterIndexArray[j] + 1].Depth,
								Water: TerrainArray[WaterIndexArray[j] + 1].Water,
								Index: WaterIndexArray[j] + 1,
							});
							Neighbors.push({
								Depth: TerrainArray[WaterIndexArray[j] - 1].Depth,
								Water: TerrainArray[WaterIndexArray[j] - 1].Water,
								Index: WaterIndexArray[j] - 1,
							});
							Neighbors.push({
								Depth: TerrainArray[WaterIndexArray[j] + res].Depth,
								Water: TerrainArray[WaterIndexArray[j] + res].Water,
								Index: WaterIndexArray[j] + res,
							});
							Neighbors.push({
								Depth: TerrainArray[WaterIndexArray[j] - res].Depth,
								Water: TerrainArray[WaterIndexArray[j] - res].Water,
								Index: WaterIndexArray[j] - res,
							});
							let lowest = Neighbors[0].Depth - Neighbors[0].Water;
							let lowestIndex = Neighbors[0].Index;

							for (let k = 0; k < Neighbors.length; k++) {
								if (
									Neighbors[k].Depth - Neighbors[k].Water == lowest &&
									Math.random() > Math.random()
								) {
									lowest = Neighbors[k].Depth - Neighbors[k].Water;
									lowestIndex = Neighbors[k].Index;
								}

								if (Neighbors[k].Depth - Neighbors[k].Water > lowest) {
									lowest = Neighbors[k].Depth - Neighbors[k].Water;
									lowestIndex = Neighbors[k].Index;
								}
							}
							let SelectedTerrain = TerrainArray[lowestIndex];

							if (SelectedTerrain.Water < 1) {
								tempWaterIndexArray.push(lowestIndex);
							}
							SelectedTerrain.Speed =
								SelectedTerrain.Water - SelectedTerrain.WaterLastFrame;

							SelectedTerrain.WaterLastFrame = SelectedTerrain.Water;

							SelectedTerrain.Water += WaterTransferRate;
							TerrainArray[WaterIndexArray[j]].Water -= WaterTransferRate;
							if (
								TerrainArray[WaterIndexArray[j]].Elevation < 100 &&
								(SelectedTerrain.Elevation > 1) &
									(TerrainArray[WaterIndexArray[j]].Speed > 30 &&
										SelectedTerrain.Sediment > 10)
							) {
								SelectedTerrain.Sediment -= 10;
								TerrainArray[WaterIndexArray[j]].Sediment += 10;

								TerrainArray[WaterIndexArray[j]].Sediment -=
									TerrainArray[WaterIndexArray[j]].Sediment / 4;

								SelectedTerrain.Sediment +=
									TerrainArray[WaterIndexArray[j]].Sediment / 4;

								//SelectedTerrain.Elevation -= 1;
								//TerrainArray[WaterIndexArray[j]].Elevation += 1;
								//SelectedTerrain.Depth += 1;
								//TerrainArray[WaterIndexArray[j]].Depth -= 1;
							}

							ctx.fillStyle =
								"rgb(" +
								TerrainArray[WaterIndexArray[j]].Speed * 10 +
								", " +
								TerrainArray[WaterIndexArray[j]].Elevation +
								", " +
								TerrainArray[WaterIndexArray[j]].Water * 2.55 +
								")";

							ctx.fillRect(
								TerrainArray[WaterIndexArray[j]].I,
								TerrainArray[WaterIndexArray[j]].J,
								1,
								1
							);
						}
					}
					WaterIndexArray = [...WaterIndexArray, ...tempWaterIndexArray];
					//console.log(WaterIndexArray.length);
				},

				0
			);
			console.log("End");
		};
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
