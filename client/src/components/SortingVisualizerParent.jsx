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
		this.sortingVisualizerRefs.forEach((ref) => ref.current.handleSort());
	}

	generateRandomArray(len) {
		return Array.from({ length: len }, () => Math.floor(Math.random() * 100));
	}

	GetComplexity() {
		let N = [50, 100, 200, 400, 800];
		for (let i = 0; i < N.length; i++) {
			let temp = this.generateRandomArray(N[i]);
			this.sortingVisualizerRefs.forEach((ref) => ref.current.setArray(temp));
			this.handleSort();
		}
	}

	resetArray() {
		let temparray = this.generateRandomArray(1000);
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
