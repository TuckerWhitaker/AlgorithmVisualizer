import "./Pathfinding.css";
import PathFindVis from "./PathFindVis";

let selectedAlgoIndex = 0;
let DelayTime = 25;
const SelectAlgo = (Index) => {
	document.getElementById("PathFindVis" + selectedAlgoIndex).style.display =
		"none";
	document.getElementById("PathFindVis" + Index).style.display = "flex";
	selectedAlgoIndex = Index;
};

function Pathfinding() {
	return (
		<div className="Pathfinding">
			<div className="SortingAlgorithmNavBar">
				<button
					className="SortingAlgorithmNavBarButton"
					onClick={() => {
						SelectAlgo(0);
					}}
				>
					Depth First Search
				</button>
				<button
					className="SortingAlgorithmNavBarButton"
					onClick={() => {
						SelectAlgo(1);
					}}
				>
					Bredth First Search
				</button>
				<button
					className="SortingAlgorithmNavBarButton"
					onClick={() => {
						SelectAlgo(2);
					}}
				>
					A* Pathfinding
				</button>
			</div>
			<PathFindVis
				SetDelay={(d) => {
					DelayTime = d;
					document.getElementById("DelaySliderNum").innerHTML = d;
				}}
				id={"PathFindVis" + 0}
				PathFindVisID={0}
				Title="Depth First Search"
				Solve={async (grid, Delay, End, SetBtnDis) => {
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
						await Delay(DelayTime);

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
						await Delay(DelayTime);

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
					SetBtnDis(false);
					//DFS
				}}
			></PathFindVis>
			<PathFindVis
				SetDelay={(d) => {
					DelayTime = d;
					document.getElementById("DelaySliderNum").innerHTML = d;
				}}
				id={"PathFindVis" + 1}
				PathFindVisID={1}
				Title="Bredth First Search"
				Solve={async (grid, Delay, End, SetBtnDis) => {
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
						await Delay(DelayTime);

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

						neighbors.forEach((neighbor) => queue.push(neighbor));

						if (queue.length > 0) {
							ctx.fillStyle = "#FFDDDD";
							ctx.fillRect(
								(queue[0].Index % 30) * 10 + 11,
								Math.floor(queue[0].Index / 30) * 10 + 11,
								8,
								8
							);

							queue.shift();
						}
					}

					ctx.fillStyle = "#FF0000";
					ctx.strokeStyle = "#FF0000";

					let LastCellOrigin = grid[End.Index].index;
					let CurrentCellOrigin = grid[End.Index].origin;
					while (CurrentCellOrigin != null) {
						await Delay(DelayTime);
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
					SetBtnDis(false);
					// BFS
				}}
			></PathFindVis>
			<PathFindVis
				SetDelay={(d) => {
					DelayTime = d;
					document.getElementById("DelaySliderNum").innerHTML = d;
				}}
				id={"PathFindVis" + 2}
				PathFindVisID={2}
				Title="A* Pathfinding"
				Solve={async function solve(grid, Delay, End, SetBtnDis) {
					function getNeighbors(grid, node) {
						let neighbors = [];
						let index = grid.indexOf(node);

						// Top
						if (
							index - 30 >= 0 &&
							!grid[index - 30].hasvisited &&
							grid[index].walls[0] === 0
						) {
							neighbors.push(grid[index - 30]);
						}

						// Right
						if (
							(index + 1) % 30 !== 0 &&
							!grid[index + 1].hasvisited &&
							grid[index].walls[1] === 0
						) {
							neighbors.push(grid[index + 1]);
						}

						// Bottom
						if (
							index + 30 < 900 &&
							!grid[index + 30].hasvisited &&
							grid[index].walls[2] === 0
						) {
							neighbors.push(grid[index + 30]);
						}

						// Left
						if (
							index % 30 !== 0 &&
							!grid[index - 1].hasvisited &&
							grid[index].walls[3] === 0
						) {
							neighbors.push(grid[index - 1]);
						}

						return neighbors;
					}

					function heuristic_cost_estimate(node, goal) {
						let dx = Math.abs((node.Index % 30) - (goal.Index % 30));
						let dy = Math.abs(
							Math.floor(node.Index / 30) - Math.floor(goal.Index / 30)
						);
						let C = dx * dx + dy * dy;
						C = Math.sqrt(C);

						return C;
					}

					function reconstructPath(node) {
						let path = [];
						while (node != null) {
							path.push(node);
							node = node.origin;
						}
						path.reverse();
						return path;
					}

					let ctx = document
						.getElementById(2 + "PathFindVisCanvas")
						.getContext("2d");
					let open = [];
					let closed = [];

					open.push(grid[0]);

					while (open.length > 0) {
						open.sort((a, b) => a.f - b.f);
						let current = open.shift();

						if (current.Index === End.Index) {
							console.log("Solved");
							SetBtnDis(false);
							let Path = reconstructPath(current);
							let LastIndex = 0;
							let CurrentIndex = 0;
							ctx.strokeStyle = "#FF0000";
							for (let i = 0; i < Path.length; i++) {
								await Delay(DelayTime);
								ctx.beginPath();
								ctx.moveTo(
									(LastIndex % 30) * 10 + 15,
									Math.floor(LastIndex / 30) * 10 + 15
								);
								ctx.lineTo(
									(CurrentIndex % 30) * 10 + 15,
									Math.floor(CurrentIndex / 30) * 10 + 15
								);
								ctx.stroke();

								LastIndex = CurrentIndex;
								CurrentIndex = Path[i].Index;
							}
							return reconstructPath(current);
						}
						await Delay(DelayTime);

						ctx.fillStyle =
							"rgb(" + 255 + "," + 255 + "," + current.f / 2 + ")";

						ctx.fillRect(
							(current.Index % 30) * 10 + 11,
							Math.floor(current.Index / 30) * 10 + 11,
							8,
							8
						);
						closed.push(current);

						let neighbors = getNeighbors(grid, current);

						for (let i = 0; i < neighbors.length; i++) {
							let neighbor = neighbors[i];

							if (closed.includes(neighbor)) {
								continue;
							}

							let tentative_gScore = current.g + 1;

							if (!open.includes(neighbor)) {
								open.push(neighbor);
							} else if (tentative_gScore >= neighbor.g) {
								continue;
							}

							neighbor.origin = current;
							neighbor.g = tentative_gScore;
							neighbor.h = heuristic_cost_estimate(neighbor, End, SetBtnDis);
							neighbor.f = neighbor.g + neighbor.h;
							ctx.fillStyle = "rgb(" + 0 + "," + neighbor.f * 8 + "," + 0 + ")";

							ctx.fillRect(
								(neighbor.Index % 30) * 10 + 11,
								Math.floor(neighbor.Index / 30) * 10 + 11,
								8,
								8
							);
						}
					}

					console.log("No solution found");
					return null;
				}}
			></PathFindVis>
		</div>
	);
}

export default Pathfinding;
