import "./V.css";
function V() {
	return (
		<div className="v">
			<div className="vColumnContainer">
				<div className="vColumn">
					<div className="vTitle">Title</div>
					<p>paragraph</p>
				</div>
				<div className="vColumn">
					<div className="Visualizer">Visualizer</div>
					<div className="ButtonContainer">
						<button className="vButton">Randomize</button>
						<button className="vButton">Solve</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default V;
