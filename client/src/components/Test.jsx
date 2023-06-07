import "./Test.css";
//import { Tile, TileGrid } from "./TileGrid.js";
import V from "./V";

class Tile {
	constructor(x, y, value) {
		this.x = x;
		this.y = y;
		this.value = value;
	}
}

class TileGrid {
	Tiles = [];

	constructor(width, height) {
		this.width = width;
		this.height = height;

		for (let i = 0; i < width; i++) {
			for (let j = 0; j < height; j++) {
				this.Tiles[i * width + j] = new Tile(
					i,
					j,
					Math.round(Math.random() * 255)
				);
			}
		}
		console.log("Tiles");
	}

	Draw(ctx) {
		const tileSize = 1;
		for (let tile of this.Tiles) {
			ctx.fillStyle =
				"RGB( " + tile.value + " , " + tile.value + ", " + tile.value + ")";
			ctx.fillRect(tile.x * tileSize, tile.y * tileSize, tileSize, tileSize);
		}
	}
}

function Test() {
	return (
		<div className="test">
			<div className="algorithmsTitle">Sorting Algorithms</div>
			<div className="Divider"></div>
			<canvas id="canvas" width={500} height={500}></canvas>
			<button
				onClick={() => {
					let tg = new TileGrid(500, 500);
					let ctx = document.getElementById("canvas").getContext("2d");
					tg.Draw(ctx);
					setInterval(
						() => {
							for (let i = 0; i < 500; i++) {
								for (let j = 0; j < 500; j++) {
									tg.Tiles[i * 500 + j].value = Math.round(Math.random() * 255);
								}
							}
							tg.Draw(ctx);
						},

						1000
					);
				}}
			>
				button
			</button>
			<V></V>
		</div>
	);
}

export default Test;
