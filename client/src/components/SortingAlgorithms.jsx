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
				codeBlock={` for (let i = 0; i < array.len; i++) {
	for (let j = 0; j < array.len - i - 1; j++) {
		if (array[j] > array[j + 1]) {
			let temp = array[j];
			array[j] = array[j + 1];
			array[j + 1] = temp;
		}
	}
 }`}
				Sort={async function bubbleSort(
					barArray,
					setBarArray,
					highlightCode,
					DelaySlider
				) {
					let highlightedBarIndex = 0;

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
							await Delay(DelaySlider);
							if (j < arrayLen - i - 1) {
								highlightCode(2);
								await Delay(DelaySlider);
								if (array[j] > array[j + 1]) {
									highlightCode(3);
									await Delay(DelaySlider);
									highlightCode(4);
									await Delay(DelaySlider);
									highlightCode(5);
									await Delay(DelaySlider);

									changeBarColors(j, "rgb(255,0,0)", "rgb(84, 84, 228)");
									await Delay(DelaySlider);

									await startSwapAnimation(j);

									[array[j], array[j + 1]] = [array[j + 1], array[j]];
									setBarArray([...array]);
									await Delay(100);
								}

								highlightCode(6);
								setTimeout(() => bubbleSortHelper(i, j + 1), 10);
								highlightCode(7);
								await Delay(DelaySlider);
							} else {
								highlightCode(7);
								await Delay(DelaySlider);
								highlightCode(8);
								await Delay(DelaySlider);

								changeBarColors(j, "rgb(255,0,0)", "rgb(84, 84, 228)");
								setTimeout(() => bubbleSortHelper(i + 1, 0), 10);
							}
						} else {
							highlightCode(9);
							await Delay(DelaySlider);
							console.log("Sorting done.", array);
						}
					}

					highlightCode(0);
					await Delay(DelaySlider);
					bubbleSortHelper(0, 0);
				}}
			></SortAlgoVis>
			<SortAlgoVis
				VisID={1}
				Title="SelectionSort"
				Description="Selection Sort Algorithm"
				codeBlock={` for (let i = 0; i < array.len; i++) {
 	let minIndex = i;
 	for (let j = i + 1; j < array.len; j++) {
 		if (array[j] < array[minIndex]) {
			minIndex = j;
		}
 	}
 	let temp = array[i];
 	array[i] = array[minIndex];
 	array[minIndex] = temp;
}`}
				Sort={async function selectionSort(
					barArray,
					setBarArray,
					highlightCode,
					DelaySlider
				) {
					let highlightedBarIndex = 0;
					let minBarIndex = 0;
					const delayTime = 50;
					const array = [...barArray];
					const arrayLen = array.length;

					function changeBarColors(barIndex, newColor, oldColor) {
						const currentBar = document.getElementById(`1BarArray${barIndex}`);
						const highlightedBar = document.getElementById(
							`1BarArray${highlightedBarIndex}`
						);

						currentBar.style.backgroundColor = newColor;
						highlightedBar.style.backgroundColor = oldColor;

						highlightedBarIndex = barIndex;
					}

					async function startSwapAnimation(barIndex1, barIndex2) {
						const bar1 = document.getElementById(`1BarArray${barIndex1}`);
						const bar2 = document.getElementById(`1BarArray${barIndex2}`);

						// calculate the actual distance between the bars
						const rect1 = bar1.getBoundingClientRect();
						const rect2 = bar2.getBoundingClientRect();
						const distance = Math.abs(rect1.left - rect2.left);

						bar1.style.transitionDuration = "0ms";
						bar2.style.transitionDuration = "0ms";
						if (barIndex1 < barIndex2) {
							bar1.style.transform = `translateX(${distance}px)`;
							bar2.style.transform = `translateX(-${distance}px)`;
						} else {
							bar1.style.transform = `translateX(-${distance}px)`;
							bar2.style.transform = `translateX(${distance}px)`;
						}
						bar1.style.transitionDuration = "0.4s";
						bar2.style.transitionDuration = "0.4s";

						await Delay(100);

						bar1.style.transform = "";
						bar2.style.transform = "";
					}

					async function selectionSortHelper(i) {
						if (i < arrayLen) {
							highlightCode(1);
							await Delay(DelaySlider);
							let BarMinIndex = 1;
							let minIndex = i;

							for (let j = i + 1; j < arrayLen; j++) {
								changeBarColors(j, "rgb(0,255,0)", "rgb(84, 84, 228)");
								document.getElementById(
									`1BarArray${minIndex}`
								).style.backgroundColor = "rgb(200, 200, 0)";
								highlightCode(2);
								await Delay(DelaySlider);
								highlightCode(3);
								await Delay(DelaySlider);

								if (array[j] < array[minIndex]) {
									document.getElementById(
										`1BarArray${minIndex}`
									).style.backgroundColor = "rgb(84, 84, 228)";
									minIndex = j;

									highlightCode(4);
									await Delay(DelaySlider);
								}

								highlightCode(5);
								await Delay(DelaySlider);
							}
							document.getElementById(
								`1BarArray${minIndex}`
							).style.backgroundColor = "rgb(84, 84, 228)";

							highlightCode(6);
							await Delay(DelaySlider);

							if (minIndex != i) {
								startSwapAnimation(i, minIndex);

								highlightCode(7);
								let temp = array[i];
								array[i] = array[minIndex];
								array[minIndex] = temp;
								setBarArray([...array]);

								highlightCode(8);
								await Delay(DelaySlider);

								highlightCode(9);
								await Delay(DelaySlider);
							}

							document.getElementById(
								`1BarArray${minBarIndex}`
							).style.backgroundColor = "rgb(84, 84, 228)";
							document.getElementById(`1BarArray${i}`).style.backgroundColor =
								"rgb(255,0,0)";
							minBarIndex = i;
							highlightCode(10);
							await Delay(DelaySlider);

							//changeBarColors(i, "rgb(255,0,0)", "rgb(84, 84, 228)");
							setTimeout(() => selectionSortHelper(i + 1), 10);
						} else {
							console.log("Sorting done.");
						}
					}

					highlightCode(0);
					await Delay(DelaySlider);
					selectionSortHelper(0);
				}}
			></SortAlgoVis>
		</div>
	);
}

export default SortingAlgorithms;
