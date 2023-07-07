import "./Pathfinding.css";
import PathFindVis from "./PathFindVis";
function Pathfinding() {
	return (
		<div className="Pathfinding">
			<PathFindVis
				PathFindVisID={0}
				Title="Depth First Search"
				Solve={async (grid, Delay, End) => {
					let ctx = document
						.getElementById(0 + "PathFindVisCanvas")
						.getContext("2d");
					let stack = [];
					let current = grid[0];
					stack.push(grid[0]);

					while (current.Index != End.Index) {
						let currentCell = stack[stack.length - 1];

						current = currentCell;

						currentCell.hasvisited = true;

						let neighbors = [];

						let index = grid.indexOf(currentCell);
						await Delay(25);

						ctx.fillStyle = "#DDDDFF";
						ctx.fillRect(
							(index % 30) * 10 + 11,
							Math.floor(index / 30) * 10 + 11,
							8,
							8
						);
						if (
							index - 30 >= 0 &&
							!grid[index - 30].hasvisited &&
							grid[index].walls[0] == 0
						)
							neighbors.push(grid[index - 30]); // Top
						if (
							(index + 1) % 30 != 0 &&
							!grid[index + 1].hasvisited &&
							grid[index].walls[1] == 0
						)
							neighbors.push(grid[index + 1]); // Right
						if (
							index + 30 < 900 &&
							!grid[index + 30].hasvisited &&
							grid[index].walls[2] == 0
						)
							neighbors.push(grid[index + 30]); // Bottom
						if (
							index % 30 != 0 &&
							!grid[index - 1].hasvisited &&
							grid[index].walls[3] == 0
						)
							neighbors.push(grid[index - 1]); // Left

						if (neighbors.length > 0) {
							let neighbor =
								neighbors[Math.floor(Math.random() * neighbors.length)];

							stack.push(neighbor);
						} else {
							ctx.fillStyle = "#FFDDDD";
							// Pop a cell from the stack
							ctx.fillRect(
								(stack[stack.length - 1].Index % 30) * 10 + 11,
								Math.floor(stack[stack.length - 1].Index / 30) * 10 + 11,
								8,
								8
							);

							stack.pop();
						}
					}

					ctx.fillStyle = "#FF0000";
					ctx.strokeStyle = "#FF0000";
					let lastCell = [stack[0]].Index;

					stack.pop();
					for (let s = 0; s < stack.length; s++) {
						await Delay(10);

						ctx.beginPath();
						ctx.moveTo(
							(lastCell % 30) * 10 + 15,
							Math.floor(lastCell / 30) * 10 + 15
						);
						ctx.lineTo(
							(stack[s].Index % 30) * 10 + 15,
							Math.floor(stack[s].Index / 30) * 10 + 15
						);
						ctx.stroke();

						lastCell = stack[s].Index;
					}
					console.log("Solved");
					//DFS
				}}
			></PathFindVis>
			<PathFindVis
				PathFindVisID={1}
				Title="Bredth First Search"
				Solve={async (grid, Delay, End) => {
					let ctx = document
						.getElementById(1 + "PathFindVisCanvas")
						.getContext("2d");
					let queue = [];
					let current = grid[0];
					queue.push(grid[0]);

					while (current.Index != End.Index) {
						let currentCell = queue[0];

						current = currentCell;

						currentCell.hasvisited = true;

						let neighbors = [];

						let index = grid.indexOf(currentCell);
						await Delay(25);

						ctx.fillStyle = "#DDDDFF";
						ctx.fillRect(
							(index % 30) * 10 + 11,
							Math.floor(index / 30) * 10 + 11,
							8,
							8
						);

						if (
							index - 30 >= 0 &&
							!grid[index - 30].hasvisited &&
							grid[index].walls[0] == 0
						) {
							neighbors.push(grid[index - 30]); // Top
							grid[index - 30].origin = [index];
						}
						if (
							(index + 1) % 30 != 0 &&
							!grid[index + 1].hasvisited &&
							grid[index].walls[1] == 0
						) {
							neighbors.push(grid[index + 1]); // Right
							grid[index + 1].origin = [index];
						}
						if (
							index + 30 < 900 &&
							!grid[index + 30].hasvisited &&
							grid[index].walls[2] == 0
						) {
							neighbors.push(grid[index + 30]); // Bottom
							grid[index + 30].origin = [index];
						}
						if (
							index % 30 != 0 &&
							!grid[index - 1].hasvisited &&
							grid[index].walls[3] == 0
						) {
							grid[index - 1].origin = [index];
							neighbors.push(grid[index - 1]); // Left
						}
						// Add all neighbors to the queue
						neighbors.forEach((neighbor) => queue.push(neighbor));

						if (queue.length > 0) {
							ctx.fillStyle = "#FFDDDD";
							ctx.fillRect(
								(queue[0].Index % 30) * 10 + 11,
								Math.floor(queue[0].Index / 30) * 10 + 11,
								8,
								8
							);

							queue.shift(); // Remove the current cell from the queue
						}
					}

					ctx.fillStyle = "#FF0000";
					ctx.strokeStyle = "#FF0000";

					let LastCellOrigin = grid[End.Index].index;
					let CurrentCellOrigin = grid[End.Index].origin;
					while (CurrentCellOrigin != null) {
						await Delay(50);
						ctx.beginPath();
						ctx.moveTo(
							(LastCellOrigin % 30) * 10 + 15,
							Math.floor(LastCellOrigin / 30) * 10 + 15
						);
						ctx.lineTo(
							(CurrentCellOrigin % 30) * 10 + 15,
							Math.floor(CurrentCellOrigin / 30) * 10 + 15
						);
						ctx.stroke();

						LastCellOrigin = CurrentCellOrigin;
						CurrentCellOrigin = grid[CurrentCellOrigin].origin;
					}
					console.log("Solved");
					// BFS
				}}
			></PathFindVis>
		</div>
	);
}

export default Pathfinding;
