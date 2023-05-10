import React, { Component } from "react";
import "./SortingVisualizer.css";

function Delay(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

class SortingVisualizer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedAlgorithm: "bubbleSort",
			sorting: false,
			array: this.props.array,
			delay: 50,
			operations: 0,
		};
	}

	setArray(array) {
		this.setState({ array });
	}

	setDelay(delay) {
		this.setState({ delay });
	}

	async swap(arr, a, b) {
		await Delay(this.state.delay);
		this.setState((prevState) => ({
			operations: prevState.operations + 1,
		}));
		let temp = arr[a];
		arr[a] = arr[b];
		arr[b] = temp;
		this.setState({ array: [...arr] });
	}

	async partition(arr, start, end) {
		let pivotIndex = start;

		let pivotValue = arr[end];
		//HighlightPivot(pivotIndex);
		for (let i = start; i < end; i++) {
			if (arr[i] < pivotValue) {
				await this.swap(arr, i, pivotIndex);
				pivotIndex++;
			}
		}

		await this.swap(arr, pivotIndex, end);
		return pivotIndex;
	}

	async quickSort(arr, start, end) {
		if (start > arr.length - 2) {
			console.log("QuickSort End");
		}
		if (start >= end) {
			return;
		}
		let index = await this.partition(arr, start, end);
		await this.quickSort(arr, start, index - 1);
		await this.quickSort(arr, index + 1, end);
	}

	async bubbleSort() {
		if (this.state.sorting) return;
		this.setState({ sorting: true });

		const array = [...this.state.array];
		let n = array.length;
		let swapped;

		do {
			swapped = false;

			for (let i = 0; i < n - 1; i++) {
				if (array[i] > array[i + 1]) {
					[array[i], array[i + 1]] = [array[i + 1], array[i]];
					swapped = true;

					this.setState((prevState) => ({
						operations: prevState.operations + 1,
					}));

					await new Promise((resolve) =>
						setTimeout(() => {
							this.setState({ array: [...array] });
							resolve();
						}, this.state.delay)
					);
				}
			}

			n--;
		} while (swapped);

		this.setState({ sorting: false });
	}

	async selectionSort() {
		if (this.state.sorting) return;
		this.setState({ sorting: true });

		const array = [...this.props.array];
		const n = array.length;

		for (let i = 0; i < n - 1; i++) {
			let minIndex = i;

			for (let j = i + 1; j < n; j++) {
				if (array[j] < array[minIndex]) {
					minIndex = j;
				}
			}

			if (minIndex !== i) {
				// Swap the elements
				[array[i], array[minIndex]] = [array[minIndex], array[i]];

				this.setState((prevState) => ({
					operations: prevState.operations + 1,
				}));

				// Update the state with the current step
				await new Promise((resolve) =>
					setTimeout(() => {
						this.setState({ array: [...array] });
						resolve();
					}, this.state.delay)
				);
			}
		}

		this.setState({ sorting: false });
	}

	handleSort() {
		const { selectedAlgorithm } = this.state;
		if (this.state.sorting) return;

		switch (selectedAlgorithm) {
			case "bubbleSort":
				this.bubbleSort();
				break;
			case "selectionSort":
				this.selectionSort();
				break;

			case "quickSort":
				this.quickSort(this.state.array, 0, this.state.array.length - 1);
				break;

			default:
				throw new Error(`Unknown sorting algorithm: ${selectedAlgorithm}`);
		}
	}

	handleAlgorithmChange(e) {
		this.setState({ selectedAlgorithm: e.target.value });
	}

	render() {
		const { array } = this.state;
		const { selectedAlgorithm, sorting, operations } = this.state;

		return (
			<div className="sorting-visualizer">
				<div className="array-container">
					{array.map((value, idx) => (
						<div
							className="array-bar"
							key={idx}
							style={{ height: `${value}px` }}
						></div>
					))}
				</div>
				<div className="controls">
					<select
						value={selectedAlgorithm}
						onChange={(e) => this.handleAlgorithmChange(e)}
					>
						<option value="bubbleSort">Bubble Sort</option>
						<option value="selectionSort">Selection Sort</option>
						<option value="quickSort">Quick Sort</option>
					</select>
				</div>
				<div className="operations-count">Operations: {operations}</div>
			</div>
		);
	}
}

export default SortingVisualizer;
