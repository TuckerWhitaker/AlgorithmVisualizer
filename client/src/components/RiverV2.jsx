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
				ctx.strokeStyle = "rgb(" + 255 + "," + 255 + "," + 255 + ")";
				ctx.beginPath();
				if (Math.random() > 0.5) {
					ctx.moveTo(i, j);
					ctx.lineTo(i + 10, j + 10);
				} else {
					ctx.moveTo(i, j + 10);
					ctx.lineTo(i + 10, j);
				}
				ctx.stroke();
			}
		}

		setInterval(
			() => {},

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
