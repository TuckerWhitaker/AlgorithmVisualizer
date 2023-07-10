import "./Main.css";
import VisualizerTile from "./VisualizerTile";

import SortedSquares from "./SortedSquares.gif";
import SortingAlgoGif from "./SortingAlgo.gif";
import GridAnimation from "./grid_animation.gif";
function Main() {
	return (
		<div className="Main">
			<VisualizerTile
				customClickEvent={() => {
					window.location.href = "http://localhost:3000/sortingalgorithms";
				}}
				GIF={SortingAlgoGif}
				Title="Sorting Algorithms"
				Description="Sorting algorithms are computational methodologies used to rearrange a list of items in a particular order, such as ascending or descending. Examples include quick sort, merge sort, and bubble sort. The efficiency of sorting algorithms is typically measured in terms of time and space complexity."
			></VisualizerTile>
			<VisualizerTile
				customClickEvent={() => {
					window.location.href = "http://localhost:3000/searchalgorithms";
				}}
				GIF={SortedSquares}
				Title="Search Algorithms"
				Description=" Search algorithms are techniques designed to locate specific items within a data structure, such as an array or graph. Examples include binary search, linear search, and depth-first search. These algorithms differ in terms of their efficiency, depending on the characteristics of the data and the specific item being sought."
			></VisualizerTile>
			<VisualizerTile
				customClickEvent={() => {
					window.location.href = "http://localhost:3000/pathfinding";
				}}
				GIF={GridAnimation}
				Title="Pathfinding Algorithms"
				Description="Pathfinding algorithms are used to find the shortest route or path between two points in a graph or network, often used in routing and navigation problems. Examples include Dijkstra's algorithm, A* (A-star) algorithm, and Bellman-Ford algorithm. The choice of pathfinding algorithm can greatly affect the efficiency and accuracy of the solution."
			></VisualizerTile>
			<VisualizerTile Title="Other Algorithms"></VisualizerTile>
		</div>
	);
}

export default Main;
