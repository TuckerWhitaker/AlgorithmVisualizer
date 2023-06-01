import React, { Component } from "react";
import SortingVisualizer from "./SortingVisualizer";

class SortingVisualizerParent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			array: this.generateRandomArray(),
		};

		this.sortingVisualizerRefs = Array.from({ length: 3 }, () =>
			React.createRef()
		);
	}

	handleSort() {
		console.log(Date.now());
		this.sortingVisualizerRefs.forEach((ref) => ref.current.handleSort());
	}

	generateRandomArray(len) {
		return Array.from({ length: len }, () => Math.floor(Math.random() * 100));
	}

	resetArray() {
		let temparray = this.generateRandomArray(100);
		this.sortingVisualizerRefs.forEach((ref) =>
			ref.current.setArray(temparray)
		);
		this.setState({ array: temparray });
	}

	setDelay(delay) {
		this.sortingVisualizerRefs.forEach((ref) => ref.current.setDelay(delay));
	}

	render() {
		const { array } = this.state;
		return (
			<div>
				<button onClick={() => this.resetArray()}>Synchronize Arrays</button>
				<button onClick={() => this.handleSort()}>Solve All</button>
				<input
					type="number"
					onChange={(e) => {
						this.setDelay(e.target.value);
					}}
				></input>

				<div style={{ display: "flex", justifyContent: "space-around" }}>
					{this.sortingVisualizerRefs.map((ref, idx) => (
						<SortingVisualizer key={idx} ref={ref} array={array} />
					))}
				</div>
			</div>
		);
	}
}

export default SortingVisualizerParent;
