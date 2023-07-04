function PathFindVis() {
	return (
		<div className="PathFindVis">
			<div className="PathFindVisTitle">Title</div>
			<div className="PathFindVisColumnParent">
				<div className="PathFindVisColumn">
					<div className="PathFindVisGrid">
						<canvas id="PathFindVisCanvas" width={320} height={320}></canvas>
					</div>
				</div>
				<div className="PathFindVisColumn PathFindVisColumnCode ">
					<div className="PathFindVisCode "></div>
				</div>
			</div>
			<button
				onClick={() => {
					let grid = [];
					let stack = [];

					for (let i = 0; i < 900; i++) {
						grid.push({ hasvisited: false, walls: [1, 1, 1, 1] });
					}

					stack.push(grid[0]);

					while (stack.length > 0) {
						let currentCell = stack[stack.length - 1];
						currentCell.hasvisited = true;

						// Get all unvisited neighbors
						let neighbors = [];
						// Assuming a 30x30 grid
						let index = grid.indexOf(currentCell);
						if (index - 30 >= 0 && !grid[index - 30].hasvisited)
							neighbors.push(grid[index - 30]); // Top
						if ((index + 1) % 30 != 0 && !grid[index + 1].hasvisited)
							neighbors.push(grid[index + 1]); // Right
						if (index + 30 < 900 && !grid[index + 30].hasvisited)
							neighbors.push(grid[index + 30]); // Bottom
						if (index % 30 != 0 && !grid[index - 1].hasvisited)
							neighbors.push(grid[index - 1]); // Left

						// If there are unvisited neighbors
						if (neighbors.length > 0) {
							// Choose a random unvisited neighbor
							let neighbor =
								neighbors[Math.floor(Math.random() * neighbors.length)];
							// Push it to the stack
							stack.push(neighbor);

							// Remove the walls between the current cell and chosen cell

							if (neighbor === grid[index - 30]) {
								// Top
								currentCell.walls[0] = 0;
								neighbor.walls[2] = 0;
							} else if (neighbor === grid[index + 1]) {
								// Right
								currentCell.walls[1] = 0;
								neighbor.walls[3] = 0;
							} else if (neighbor === grid[index + 30]) {
								// Bottom
								currentCell.walls[2] = 0;
								neighbor.walls[0] = 0;
							} else if (neighbor === grid[index - 1]) {
								// Left
								currentCell.walls[3] = 0;
								neighbor.walls[1] = 0;
							}
						} else {
							// Pop a cell from the stack
							stack.pop();
						}
					}

					let ctx = document
						.getElementById("PathFindVisCanvas")
						.getContext("2d");

					ctx.lineWidth = 2;

					ctx.fillStyle = "#FFFFFF";
					ctx.fillRect(0, 0, 320, 320);
					ctx.fillStyle = "#000000";

					for (let i = 10; i < 320 - 10; i += 10) {
						for (let j = 10; j < 320 - 10; j += 10) {
							// Calculate cell index from x and y
							let x = (i - 10) / 10;
							let y = (j - 10) / 10;
							let index = y * 30 + x;

							ctx.strokeStyle = "rgba(0, 0, 0, 2)";

							// Draw top wall
							if (grid[index].walls[0]) {
								ctx.beginPath();
								ctx.moveTo(i, j);
								ctx.lineTo(i + 10, j);
								ctx.stroke();
							}

							// Draw right wall
							if (grid[index].walls[1]) {
								ctx.beginPath();
								ctx.moveTo(i + 10, j);
								ctx.lineTo(i + 10, j + 10);
								ctx.stroke();
							}

							// Draw bottom wall
							if (grid[index].walls[2]) {
								ctx.beginPath();
								ctx.moveTo(i, j + 10);
								ctx.lineTo(i + 10, j + 10);
								ctx.stroke();
							}

							// Draw left wall
							if (grid[index].walls[3]) {
								ctx.beginPath();
								ctx.moveTo(i, j);
								ctx.lineTo(i, j + 10);
								ctx.stroke();
							}
						}
					}

					ctx.fillStyle = "#00FF00";
					ctx.fillRect(11, 11, 8, 8);
					ctx.fillStyle = "#0000FF";
					ctx.fillRect(301, 301, 8, 8);
				}}
			>
				Maze
			</button>
		</div>
	);
}

export default PathFindVis;
