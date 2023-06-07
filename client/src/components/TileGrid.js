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
		console.log("p");
		const tileSize = 50;
		for (let tile of this.Tiles) {
			ctx.fillStyle =
				"RGB( " + tile.value + " , " + tile.value + ", " + tile.value + ")";
			ctx.fillRect(tile.x * tileSize, tile.y * tileSize, tileSize, tileSize);
		}
	}
}

class Tile {
	constructor(x, y, value) {
		this.x = x;
		this.y = y;
		this.value = value;
	}
}
