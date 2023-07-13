import SortAlgoVis from "./SortAlgoVis";
import "./SortingAlgorithms.css";
function SortingAlgorithms() {
	function Delay(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}

	return (
		<div className="SortingAlgorithms">
			<SortAlgoVis
				VisID={0}
				Title="BubbleSort"
				Description="Bubble Sort Algorithm"
				CodeArray={[
					{
						Tab: 0,
						string: "for (let i = 0; i < array.len; i++) {",
						HighLight: 0,
					},
					{
						Tab: 50,
						string: "for (let j = 0; j < array.len - i - 1; j++) {",
						HighLight: 0,
					},
					{
						Tab: 100,
						string: "if (array[j] > array[j + 1]) {",
						HighLight: 0,
					},
					{
						Tab: 150,
						string: "let temp = array[j];",
						HighLight: 0,
					},
					{
						Tab: 150,
						string: "array[j] = array[j + 1];",
						HighLight: 0,
					},
					{
						Tab: 150,
						string: "array[j + 1] = temp;",
						HighLight: 0,
					},
					{
						Tab: 100,
						string: "}",
						HighLight: 0,
					},
					{
						Tab: 50,
						string: "}",
						HighLight: 0,
					},
					{
						Tab: 0,
						string: "}",
						HighLight: 0,
					},
				]}
				Sort={async function bubbleSort(barArray, setBarArray, highlightCode) {
					let highlightedBarIndex = 0;

					const delayTime = 20;
					const array = [...barArray];
					const arrayLen = array.length;

					function changeBarColors(barIndex, newColor, oldColor) {
						const currentBar = document.getElementById(`0BarArray${barIndex}`);
						const highlightedBar = document.getElementById(
							`0BarArray${highlightedBarIndex}`
						);

						currentBar.style.backgroundColor = newColor;
						highlightedBar.style.backgroundColor = oldColor;

						highlightedBarIndex = barIndex;
					}

					async function startSwapAnimation(barIndex) {
						const currentBar = document.getElementById(`0BarArray${barIndex}`);
						const nextBar = document.getElementById(`0BarArray${barIndex + 1}`);

						currentBar.classList.add("swap-start");
						nextBar.classList.add("swap-end");

						await Delay(100);

						currentBar.classList.remove("swap-start");
						nextBar.classList.remove("swap-end");
					}

					async function bubbleSortHelper(i, j) {
						if (i < arrayLen) {
							highlightCode(1);
							await Delay(delayTime);
							if (j < arrayLen - i - 1) {
								highlightCode(2);
								await Delay(delayTime);
								if (array[j] > array[j + 1]) {
									highlightCode(3);
									await Delay(delayTime);
									highlightCode(4);
									await Delay(delayTime);
									highlightCode(5);
									await Delay(delayTime);

									changeBarColors(j, "rgb(255,0,0)", "rgb(84, 84, 228)");
									await Delay(delayTime);

									await startSwapAnimation(j);

									[array[j], array[j + 1]] = [array[j + 1], array[j]];
									setBarArray([...array]);
									await Delay(100);
								}

								highlightCode(6);
								setTimeout(() => bubbleSortHelper(i, j + 1), 10);
								highlightCode(7);
								await Delay(delayTime);
							} else {
								highlightCode(7);
								await Delay(delayTime);
								highlightCode(8);
								await Delay(delayTime);

								changeBarColors(j, "rgb(255,0,0)", "rgb(84, 84, 228)");
								setTimeout(() => bubbleSortHelper(i + 1, 0), 10);
							}
						} else {
							highlightCode(9);
							await Delay(delayTime);
							console.log("Sorting done.", array);
						}
					}

					highlightCode(0);
					await Delay(delayTime);
					bubbleSortHelper(0, 0);
				}}
			></SortAlgoVis>
		</div>
	);
}

export default SortingAlgorithms;
