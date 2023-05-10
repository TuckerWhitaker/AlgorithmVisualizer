import "./Graph.css";

function Graph() {
	return (
		<div className="Graph">
			<canvas id="Graph" width={1000} height={1000}></canvas>
			<button
				className="GraphButton"
				onClick={() => {
					let ctx = document.getElementById("Graph").getContext("2d");
					ctx.strokeStyle = "#000000";
					ctx.lineWidth = 1;
					let b = 1000;
					for (let i = 0; i < 1000; i++) {
						for (let j = 0; j < 1000; j++) {
							ctx.fillStyle =
								"rgb(" + i / 5 + "," + j / 5 + "," + 255 / 2 + ")";
							ctx.fillRect(i, j, 1, 1);
						}
					}
				}}
			>
				draw
			</button>
		</div>
	);
}

export default Graph;
