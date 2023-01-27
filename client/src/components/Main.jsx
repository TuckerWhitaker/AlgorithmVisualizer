import "./Main.css";

function Main() {
	return (
		<div className="Main">
			<h2>Algorithm Visualizer</h2>
			<button
				className="MainBtn"
				onClick={() => {
					window.location.href = "http://localhost:3000/BubbleSort";
				}}
			>
				Bubble Sort
			</button>
		</div>
	);
}

export default Main;
