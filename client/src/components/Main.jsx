import "./Main.css";

function Main() {
	return (
		<div className="Main">
			<h2>Sorting Algorithms</h2>
			<button
				className="MainBtn"
				onClick={() => {
					window.location.href = "http://localhost:3000/BubbleSort";
				}}
			>
				Bubble Sort
			</button>
			<h2>Pathfinding Algorithms</h2>

			<h2>Search Algorithms</h2>

			<h2>Graph Algorithms</h2>

			<h2>String Matching Algorithms</h2>
		</div>
	);
}

export default Main;
