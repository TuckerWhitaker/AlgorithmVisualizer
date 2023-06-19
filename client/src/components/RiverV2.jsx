import HeightMap from "./HeightMap.jpg";
import "./River.css";

let res = 500;

function River() {
	let TerrainArray = [];
	let WaterArray = [];

	const Start = () => {
		const canvas = document.getElementById("WaterCanvas");
		const ctx = document.getElementById("WaterCanvas").getContext("2d");

		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, res, res);

		for (let i = 0; i < res; i += 10) {
			for (let j = 0; j < res; j += 10) {
				ctx.fillStyle = "rgb(" + 0 + "," + j / 5 + "," + 0 + ")";
				ctx.fillRect(i, j, 10, 10);
				ctx.fillStyle = "rgb(" + 255 + "," + 255 + "," + 255 + ")";
				ctx.fillRect(i, j, 5, 1);
			}
		}

		let iter = 0;

		let DirectionsI = [0, 5, 0, -5];
		let DirectionsJ = [5, 0, -5, 0];
		setInterval(
			() => {
				if (iter >= DirectionsI.length) {
					iter = 0;
				}
				for (let i = 0; i < res; i += 10) {
					for (let j = 0; j < res; j += 10) {
						ctx.fillStyle = "rgb(" + 0 + "," + j / 5 + "," + 0 + ")";
						ctx.strokeStyle = "rgb(" + 255 + "," + 255 + "," + 255 + ")";
						ctx.fillRect(i, j, 10, 10);
						ctx.fillStyle = "rgb(" + 255 + "," + 0 + "," + 0 + ")";
						ctx.beginPath();
						ctx.moveTo(i, j);
						ctx.lineTo(i + DirectionsI[iter], j + DirectionsJ[iter]);
						ctx.fillRect(i + DirectionsI[iter], j + DirectionsJ[iter], 1, 1);

						// Draw the Path
						ctx.stroke();
					}
				}
				iter++;
			},

			1000
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
