import "./Pathfinding.css";
import PathFindVis from "./PathFindVis";
let CodeBlocks = [
	` Solve = async (grid, End) => {
	 let stack = [];
	 let current = grid[0];
	 stack.push(grid[0]);
	
	 while (current.Index != End.Index) {
		 let currentCell = stack[stack.length - 1];
		 current = currentCell;
		 currentCell.hasvisited = true;
		 let neighbors = [];
		 let index = grid.indexOf(currentCell);
	
		 if (index - 30 >= 0 && !grid[index - 30].hasvisited && grid[index].walls[0] == 0){
			 neighbors.push(grid[index - 30]);
		 }// Top
		 if ((index + 1) % 30 != 0 && !grid[index + 1].hasvisited && grid[index].walls[1] == 0){
			 neighbors.push(grid[index + 1]);
		 }// Right
		 if (index + 30 < 900 && !grid[index + 30].hasvisited && grid[index].walls[2] == 0){
			 neighbors.push(grid[index + 30]);
		 }// Bottom
		 if (index % 30 != 0 && !grid[index - 1].hasvisited && grid[index].walls[3] == 0){
			 neighbors.push(grid[index - 1]);
		 }// Left
	
		 if (neighbors.length > 0) {
			 let neighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
			 stack.push(neighbor);
		 } else {
			 stack.pop();
		 }
	 }
	 return stack;
 }`,
	` Solve = async (grid, End) => {
	 let queue = [];
	 let current = grid[0];
	 queue.push(grid[0]);
	   
	 while (current.Index != End.Index) {
		 let currentCell = queue.shift();
		 current = currentCell;
		 currentCell.hasvisited = true;
		 let neighbors = [];
		 let index = grid.indexOf(currentCell);
	   
		 if (index - 30 >= 0 && !grid[index - 30].hasvisited && grid[index].walls[0] == 0){
			 neighbors.push(grid[index - 30]);
		 }// Top
		 if ((index + 1) % 30 != 0 && !grid[index + 1].hasvisited && grid[index].walls[1] == 0){
			 neighbors.push(grid[index + 1]);
		 }// Right
		 if (index + 30 < 900 && !grid[index + 30].hasvisited && grid[index].walls[2] == 0){
			 neighbors.push(grid[index + 30]);
		 }// Bottom
		 if (index % 30 != 0 && !grid[index - 1].hasvisited && grid[index].walls[3] == 0){
			 neighbors.push(grid[index - 1]);
		 }// Left
	   
		 for (let neighbor of neighbors) {
		    if (!neighbor.hasvisited) {
			    queue.push(neighbor);
		    }
		 }
	 }
	 return queue;
 }`,
	` Solve = async (grid, Start, End) => {
    let openList = [Start], closedList = [], path = [];
    while (openList.length) {
        let node = openList.sort((a,b) => a.f - b.f).shift();
        closedList.push(node);
        let idx = grid.indexOf(node);
        let neighbors = [[idx-30,0],[idx+1,1],[idx+30,2],[idx-1,3]].filter(([idx,direction]) =>
            idx >= 0 && idx < 900 && !grid[idx].hasvisited && node.walls[direction] == 0 && !closedList.some(n => n.Index == idx)
        ).map(idx => grid[idx]);
        for (let n of neighbors) {
            let g = node.g + 1, h = Math.abs(n.Index - End.Index), f = g + h;
            if (!openList.some(el => el.Index === n.Index)) {
                Object.assign(n, {parent: node, g, h, f});
                openList.push(n);
            } else if (g < n.g) {
                Object.assign(n, {parent: node, g, h, f});
            }
        }
        if (node.Index === End.Index) {
            while (node.parent) { path.push(node); node = node.parent; }
            return path.reverse();
        }
    }
    return [];
 }`,
];

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
				codeBlock={CodeBlocks[0]}
				SetDelay={(d) => {
					DelayTime = d;
				}}
				id={"PathFindVis" + 0}
				PathFindVisID={0}
				Title="Depth First Search"
				Solve={async (grid, Delay, End, SetBtnDis, highlightCode) => {
					let ctx = document
						.getElementById(0 + "PathFindVisCanvas")
						.getContext("2d");
					let stack = [];
					let current = grid[0];
					stack.push(grid[0]);

					await highlightCode(0, DelayTime);
					await highlightCode(1, DelayTime);
					await highlightCode(2, DelayTime);
					await highlightCode(3, DelayTime);
					await highlightCode(4, DelayTime);

					while (current.Index != End.Index) {
						if (DelayTime == 0) {
							await Delay(25);
						}

						await highlightCode(5, DelayTime);
						await highlightCode(6, DelayTime);
						await highlightCode(7, DelayTime);
						await highlightCode(8, DelayTime);
						await highlightCode(9, DelayTime);
						await highlightCode(10, DelayTime);
						await highlightCode(11, DelayTime);

						let currentCell = stack[stack.length - 1];

						current = currentCell;

						currentCell.hasvisited = true;

						let neighbors = [];

						let index = grid.indexOf(currentCell);

						ctx.fillStyle = "#DDDDFF";
						ctx.fillRect(
							(index % 30) * 10 + 11,
							Math.floor(index / 30) * 10 + 11,
							8,
							8
						);

						await highlightCode(12, DelayTime);

						if (
							index - 30 >= 0 &&
							!grid[index - 30].hasvisited &&
							grid[index].walls[0] == 0
						) {
							neighbors.push(grid[index - 30]);
							await highlightCode(13, DelayTime);
						} // Top
						await highlightCode(14, DelayTime);
						await highlightCode(15, DelayTime);
						if (
							(index + 1) % 30 != 0 &&
							!grid[index + 1].hasvisited &&
							grid[index].walls[1] == 0
						) {
							neighbors.push(grid[index + 1]);
							await highlightCode(16, DelayTime);
						} // Right
						await highlightCode(17, DelayTime);
						await highlightCode(18, DelayTime);
						if (
							index + 30 < 900 &&
							!grid[index + 30].hasvisited &&
							grid[index].walls[2] == 0
						) {
							neighbors.push(grid[index + 30]);
							await highlightCode(19, DelayTime);
						} // Bottom
						await highlightCode(20, DelayTime);
						await highlightCode(21, DelayTime);
						if (
							index % 30 != 0 &&
							!grid[index - 1].hasvisited &&
							grid[index].walls[3] == 0
						) {
							neighbors.push(grid[index - 1]);
							await highlightCode(22, DelayTime);
						} // Left
						await highlightCode(23, DelayTime);
						await highlightCode(24, DelayTime);
						await highlightCode(25, DelayTime);

						if (neighbors.length > 0) {
							await highlightCode(26, DelayTime);
							await highlightCode(27, DelayTime);
							let neighbor =
								neighbors[Math.floor(Math.random() * neighbors.length)];

							stack.push(neighbor);
						} else {
							await highlightCode(28, DelayTime);
							await highlightCode(29, DelayTime);
							ctx.fillStyle = "#FFDDDD";

							ctx.fillRect(
								(stack[stack.length - 1].Index % 30) * 10 + 11,
								Math.floor(stack[stack.length - 1].Index / 30) * 10 + 11,
								8,
								8
							);

							stack.pop();
							await highlightCode(30, DelayTime);
						}

						await highlightCode(31, DelayTime);
					}
					await highlightCode(32, DelayTime);
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
				codeBlock={CodeBlocks[1]}
				SetDelay={(d) => {
					DelayTime = d;
				}}
				id={"PathFindVis" + 1}
				PathFindVisID={1}
				Title="Bredth First Search"
				Solve={async (grid, Delay, End, SetBtnDis, highlightCode) => {
					let ctx = document
						.getElementById(1 + "PathFindVisCanvas")
						.getContext("2d");
					let queue = [];
					let current = grid[0];
					queue.push(grid[0]);

					await highlightCode(0, DelayTime);
					await highlightCode(1, DelayTime);
					await highlightCode(2, DelayTime);
					await highlightCode(3, DelayTime);
					await highlightCode(4, DelayTime);

					while (current.Index != End.Index) {
						if (DelayTime == 0) {
							await Delay(25);
						}

						await highlightCode(5, DelayTime);
						await highlightCode(6, DelayTime);
						await highlightCode(7, DelayTime);
						await highlightCode(8, DelayTime);
						await highlightCode(9, DelayTime);
						await highlightCode(10, DelayTime);
						await highlightCode(11, DelayTime);

						let currentCell = queue[0];

						current = currentCell;

						currentCell.hasvisited = true;

						let neighbors = [];

						let index = grid.indexOf(currentCell);
						//await Delay(DelayTime);

						ctx.fillStyle = "#DDDDFF";
						ctx.fillRect(
							(index % 30) * 10 + 11,
							Math.floor(index / 30) * 10 + 11,
							8,
							8
						);

						await highlightCode(12, DelayTime);

						if (
							index - 30 >= 0 &&
							!grid[index - 30].hasvisited &&
							grid[index].walls[0] == 0
						) {
							neighbors.push(grid[index - 30]); // Top
							grid[index - 30].origin = [index];
							await highlightCode(13, DelayTime);
						}
						await highlightCode(14, DelayTime);
						await highlightCode(15, DelayTime);
						if (
							(index + 1) % 30 != 0 &&
							!grid[index + 1].hasvisited &&
							grid[index].walls[1] == 0
						) {
							neighbors.push(grid[index + 1]); // Right
							grid[index + 1].origin = [index];
							await highlightCode(16, DelayTime);
						}
						await highlightCode(17, DelayTime);
						await highlightCode(18, DelayTime);
						if (
							index + 30 < 900 &&
							!grid[index + 30].hasvisited &&
							grid[index].walls[2] == 0
						) {
							neighbors.push(grid[index + 30]); // Bottom
							grid[index + 30].origin = [index];
							await highlightCode(19, DelayTime);
						}
						await highlightCode(20, DelayTime);
						await highlightCode(21, DelayTime);
						if (
							index % 30 != 0 &&
							!grid[index - 1].hasvisited &&
							grid[index].walls[3] == 0
						) {
							grid[index - 1].origin = [index];
							neighbors.push(grid[index - 1]); // Left
							await highlightCode(22, DelayTime);
						}
						await highlightCode(23, DelayTime);
						await highlightCode(24, DelayTime);
						//neighbors.forEach((neighbor) => queue.push(neighbor));
						for (let neighbor of neighbors) {
							await highlightCode(25, DelayTime);
							await highlightCode(26, DelayTime);
							if (!neighbor.hasvisited) {
								queue.push(neighbor);
								await highlightCode(27, DelayTime);
							}
							await highlightCode(28, DelayTime);
							await highlightCode(29, DelayTime);
						}

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
					await highlightCode(30, DelayTime);
					await highlightCode(31, DelayTime);

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
				codeBlock={CodeBlocks[2]}
				SetDelay={(d) => {
					DelayTime = d;
				}}
				id={"PathFindVis" + 2}
				PathFindVisID={2}
				Title="A* Pathfinding"
				Solve={async function solve(
					grid,
					Delay,
					End,
					SetBtnDis,
					highlightCode
				) {
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

					await highlightCode(0, DelayTime);
					await highlightCode(1, DelayTime);
					open.push(grid[0]);

					while (open.length > 0) {
						await highlightCode(2, DelayTime);
						await highlightCode(3, DelayTime);
						await highlightCode(4, DelayTime);
						await highlightCode(5, DelayTime);
						await highlightCode(6, DelayTime);
						await highlightCode(7, DelayTime);
						await highlightCode(8, DelayTime);
						open.sort((a, b) => a.f - b.f);
						let current = open.shift();

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
							await highlightCode(9, DelayTime);
							await highlightCode(10, DelayTime);
							await highlightCode(11, DelayTime);
							let neighbor = neighbors[i];

							if (closed.includes(neighbor)) {
								continue;
							}

							let tentative_gScore = current.g + 1;

							if (!open.includes(neighbor)) {
								await highlightCode(12, DelayTime);
								await highlightCode(13, DelayTime);
								await highlightCode(14, DelayTime);
								open.push(neighbor);
							} else if (tentative_gScore >= neighbor.g) {
								await highlightCode(15, DelayTime);
								await highlightCode(16, DelayTime);
								continue;
							}

							neighbor.origin = current;
							neighbor.g = tentative_gScore;
							neighbor.h = heuristic_cost_estimate(neighbor, End);
							neighbor.f = neighbor.g + neighbor.h;
							ctx.fillStyle = "rgb(" + 0 + "," + neighbor.f * 8 + "," + 0 + ")";

							ctx.fillRect(
								(neighbor.Index % 30) * 10 + 11,
								Math.floor(neighbor.Index / 30) * 10 + 11,
								8,
								8
							);
							await highlightCode(17, DelayTime);
						}
						await highlightCode(18, DelayTime);
						if (current.Index === End.Index) {
							await highlightCode(19, DelayTime);
							await highlightCode(20, DelayTime);

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
						await highlightCode(21, DelayTime);
						await Delay(DelayTime);
						await highlightCode(22, DelayTime);
					}

					console.log("No solution found");
					return null;
				}}
			></PathFindVis>
		</div>
	);
}

export default Pathfinding;
