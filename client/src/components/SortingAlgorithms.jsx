import { useState } from "react";
import SortAlgoVis from "./SortAlgoVis";
import "./SortingAlgorithms.css";
function SortingAlgorithms() {
	function Delay(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}

	let DelayTime = 25;
	let DelaySlider = 25;

	//const [DelaySlider, SetDelaySlider] = useState(25);

	let selectedAlgoIndex = 0;

	const SelectAlgo = (Index) => {
		document.getElementById("SortAlgoVis" + selectedAlgoIndex).style.display =
			"none";
		document.getElementById("SortAlgoVis" + Index).style.display = "flex";
		selectedAlgoIndex = Index;
	};

	async function startSwapAnimation(barIndex1, barIndex2, VisID) {
		const bar1 = document.getElementById(`${VisID}BarArray${barIndex1}`);
		const bar2 = document.getElementById(`${VisID}BarArray${barIndex2}`);

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

	return (
		<div className="SortingAlgorithms">
			<div className="SortingAlgorithmNavBar">
				<button
					className="SortingAlgorithmNavBarButton"
					onClick={() => {
						SelectAlgo(0);
					}}
				>
					Bubble Sort
				</button>
				<button
					className="SortingAlgorithmNavBarButton"
					onClick={() => {
						SelectAlgo(1);
					}}
				>
					Selection Sort
				</button>
				<button
					className="SortingAlgorithmNavBarButton"
					onClick={() => {
						SelectAlgo(2);
					}}
				>
					Heap Sort
				</button>
				<button
					className="SortingAlgorithmNavBarButton"
					onClick={() => {
						SelectAlgo(3);
					}}
				>
					Quick Sort
				</button>
				<button
					className="SortingAlgorithmNavBarButton"
					onClick={() => {
						SelectAlgo(4);
					}}
				>
					Radix Sort
				</button>
			</div>
			<div id="DelaySliderNum">{DelaySlider}</div>

			<SortAlgoVis
				SetDelay={(d) => {
					DelayTime = d;
					document.getElementById("DelaySliderNum").innerHTML = d;
				}}
				id={"SortAlgoVis" + 0}
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
					SetBtnDis
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

					async function bubbleSortHelper(i, j) {
						if (i < arrayLen) {
							highlightCode(1);

							await Delay(DelayTime);
							if (j < arrayLen - i - 1) {
								highlightCode(2);
								await Delay(DelayTime);
								if (array[j] > array[j + 1]) {
									highlightCode(3);
									await Delay(DelayTime);
									highlightCode(4);
									await Delay(DelayTime);
									highlightCode(5);
									await Delay(DelayTime);

									changeBarColors(j, "rgb(255,0,0)", "rgb(84, 84, 228)");
									await Delay(DelayTime);

									await startSwapAnimation(j, j + 1, 0);

									[array[j], array[j + 1]] = [array[j + 1], array[j]];
									setBarArray([...array]);
									await Delay(100);
								}

								highlightCode(6);
								setTimeout(() => bubbleSortHelper(i, j + 1), 10);
								highlightCode(7);
								await Delay(DelayTime);
							} else {
								highlightCode(7);
								await Delay(DelayTime);
								highlightCode(8);
								await Delay(DelayTime);

								changeBarColors(j, "rgb(255,0,0)", "rgb(84, 84, 228)");
								setTimeout(() => bubbleSortHelper(i + 1, 0), 10);
							}
						} else {
							highlightCode(9);
							await Delay(DelayTime);
							console.log("Sorting done.", array);
							SetBtnDis(false);
						}
					}

					highlightCode(0);
					await Delay(DelayTime);
					bubbleSortHelper(0, 0);
				}}
			></SortAlgoVis>
			<SortAlgoVis
				SetDelay={(d) => {
					DelayTime = d;
					document.getElementById("DelaySliderNum").innerHTML = d;
				}}
				id={"SortAlgoVis" + 1}
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
					SetBtnDis
				) {
					let highlightedBarIndex = 0;
					let minBarIndex = 0;

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

					async function selectionSortHelper(i) {
						if (i < arrayLen) {
							highlightCode(1);
							await Delay(DelayTime);

							let BarMinIndex = 1;
							let minIndex = i;

							for (let j = i + 1; j < arrayLen; j++) {
								changeBarColors(j, "rgb(0,255,0)", "rgb(84, 84, 228)");
								document.getElementById(
									`1BarArray${minIndex}`
								).style.backgroundColor = "rgb(200, 200, 0)";
								highlightCode(2);
								await Delay(DelayTime);
								highlightCode(3);
								await Delay(DelayTime);

								if (array[j] < array[minIndex]) {
									document.getElementById(
										`1BarArray${minIndex}`
									).style.backgroundColor = "rgb(84, 84, 228)";
									minIndex = j;

									highlightCode(4);
									await Delay(DelayTime);
								}

								highlightCode(5);
								await Delay(DelayTime);
							}
							document.getElementById(
								`1BarArray${minIndex}`
							).style.backgroundColor = "rgb(84, 84, 228)";

							highlightCode(6);
							await Delay(DelayTime);

							if (minIndex != i) {
								await startSwapAnimation(i, minIndex, 1);

								highlightCode(7);
								let temp = array[i];
								array[i] = array[minIndex];
								array[minIndex] = temp;
								setBarArray([...array]);

								highlightCode(8);
								await Delay(DelayTime);

								highlightCode(9);
								await Delay(DelayTime);
							}

							document.getElementById(
								`1BarArray${minBarIndex}`
							).style.backgroundColor = "rgb(84, 84, 228)";
							document.getElementById(`1BarArray${i}`).style.backgroundColor =
								"rgb(255,0,0)";
							minBarIndex = i;
							highlightCode(10);
							await Delay(DelayTime);

							//changeBarColors(i, "rgb(255,0,0)", "rgb(84, 84, 228)");
							setTimeout(() => selectionSortHelper(i + 1), 10);
						} else {
							console.log("Sorting done.");
							SetBtnDis(false);
						}
					}

					highlightCode(0);
					await Delay(DelayTime);
					selectionSortHelper(0);
				}}
			></SortAlgoVis>
			<SortAlgoVis
				SetDelay={(d) => {
					DelayTime = d;
					document.getElementById("DelaySliderNum").innerHTML = d;
				}}
				id={"SortAlgoVis" + 2}
				VisID={2}
				Title="HeapSort"
				Description="Heap Sort Algorithm"
				codeBlock={`
function heapify(array, heapSize, i) {
	let max = i;
	let left = 2 * i + 1;
	let right = 2 * i + 2;

	if (left < heapSize && array[left] > array[max]) {
		max = left;
	}
	if (right < heapSize && array[right] > array[max]) {
		max = right;
	}
	if (max !== i) {
		let temp = array[i];
		array[i] = array[max];
		array[max] = temp;
		heapify(array, heapSize, max);
	}
}

for (let i = Math.floor(array.len / 2 - 1); i >= 0; i--) {
	heapify(array, array.len, i);
}

for (let i = array.len - 1; i >= 0; i--) {
	let temp = array[0];
	array[0] = array[i];
	array[i] = temp;
	heapify(array, i, 0);
}`}
				Sort={async function heapSort(
					barArray,
					setBarArray,
					highlightCode,
					SetBtnDis
				) {
					let highlightedBarIndex = 0;
					let array = [...barArray];
					const arrayLen = array.length;

					function changeBarColors(barIndex, newColor, oldColor) {
						const currentBar = document.getElementById(`2BarArray${barIndex}`);
						const highlightedBar = document.getElementById(
							`2BarArray${highlightedBarIndex}`
						);

						currentBar.style.backgroundColor = newColor;
						highlightedBar.style.backgroundColor = oldColor;

						highlightedBarIndex = barIndex;
					}

					async function heapify(heapSize, i) {
						let max = i;
						let left = 2 * i + 1;
						let right = 2 * i + 2;

						if (left < heapSize && array[left] > array[max]) {
							max = left;
						}

						if (right < heapSize && array[right] > array[max]) {
							max = right;
						}

						if (max !== i) {
							await startSwapAnimation(i, max, 2);
							let temp = array[i];
							array[i] = array[max];
							array[max] = temp;
							setBarArray([...array]);
							await heapify(heapSize, max);
						}
					}

					for (let i = Math.floor(arrayLen / 2 - 1); i >= 0; i--) {
						changeBarColors(i, "rgb(0,255,0)", "rgb(84, 84, 228)");
						await heapify(arrayLen, i);
					}

					for (let i = arrayLen - 1; i >= 0; i--) {
						changeBarColors(i, "rgb(255,0,0)", "rgb(84, 84, 228)");
						await startSwapAnimation(0, i, 2);
						let temp = array[0];
						array[0] = array[i];
						array[i] = temp;
						setBarArray([...array]);
						await heapify(i, 0);
					}

					console.log("Sorting done.");
					SetBtnDis(false);
				}}
			></SortAlgoVis>
			<SortAlgoVis
				SetDelay={(d) => {
					DelayTime = d;
					document.getElementById("DelaySliderNum").innerHTML = d;
				}}
				id={"SortAlgoVis" + 3}
				VisID={3}
				Title="QuickSort"
				Description="Quick Sort Algorithm"
				codeBlock={` function quickSort(array, start, end) {
 	if (start < end) {
 		let pivotIndex = partition(array, start, end);

 		quickSort(array, start, pivotIndex - 1);
 		quickSort(array, pivotIndex + 1, end);
 	}
 }

 function partition(array, start, end) {
 	let pivotValue = array[end];
 	let pivotIndex = start;
 	
 	for (let i = start; i < end; i++) {
 		if (array[i] < pivotValue) {
 			[array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
 			pivotIndex++;
 		}
 	}

 	[array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
 	return pivotIndex;
 }

 quickSort(array, 0, array.len - 1);`}
				Sort={async function quickSort(
					barArray,
					setBarArray,
					highlightCode,
					SetBtnDis
				) {
					let highlightedBarIndex = 0;
					const delayTime = 50;
					const array = [...barArray];
					const arrayLen = array.length;

					function changeBarColors(barIndex, newColor, oldColor) {
						const currentBar = document.getElementById(`3BarArray${barIndex}`);
						const highlightedBar = document.getElementById(
							`3BarArray${highlightedBarIndex}`
						);

						currentBar.style.backgroundColor = newColor;
						highlightedBar.style.backgroundColor = oldColor;

						highlightedBarIndex = barIndex;
					}

					async function quickSortHelper(start, end) {
						if (start < end) {
							let pivotIndex = await partitionHelper(start, end);
							document.getElementById(
								`3BarArray${pivotIndex}`
							).style.backgroundColor = "rgb(200, 200, 0)";
							//await Delay(DelayTime);
							await quickSortHelper(start, pivotIndex - 1);
							await quickSortHelper(pivotIndex + 1, end);
							document.getElementById(
								`3BarArray${pivotIndex}`
							).style.backgroundColor = "rgb(84, 84, 228)";
						}
						if (start == 0 && end == 40) {
							console.log("End");
							SetBtnDis(false);
						}
					}

					async function partitionHelper(start, end) {
						let pivotValue = array[end];
						let pivotIndex = start;

						for (let i = start; i < end; i++) {
							changeBarColors(i, "rgb(0,255,0)", "rgb(84, 84, 228)");

							highlightCode(1);
							await Delay(DelayTime);

							if (array[i] < pivotValue) {
								await startSwapAnimation(i, pivotIndex, 3);
								await Delay(DelayTime);
								[array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
								pivotIndex++;
								setBarArray([...array]);

								highlightCode(2);
								await Delay(DelayTime);
							}

							highlightCode(3);
							await Delay(DelayTime);
						}

						await startSwapAnimation(pivotIndex, end, 3);
						[array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];

						highlightCode(4);
						await Delay(DelayTime);

						setBarArray([...array]);
						highlightCode(5);
						await Delay(DelayTime);

						return pivotIndex;
					}

					highlightCode(0);
					await Delay(DelayTime);
					quickSortHelper(0, arrayLen - 1);
				}}
			></SortAlgoVis>
			<SortAlgoVis
				SetDelay={(d) => {
					DelayTime = d;
					document.getElementById("DelaySliderNum").innerHTML = d;
				}}
				id={"SortAlgoVis" + 4}
				VisID={4}
				Title="RadixSort"
				Description={`The Radix Sort algorithm sorts integers by processing individual digits. It exploits the fact that information about the size of a number is encoded in the number of digits. More efficient than comparison sorts, it operates on a per-digit basis, usually from least significant digit (LSD) to most significant digit (MSD).

				In our visualization, the algorithm moves through each digit place, grouping numbers by the value of their digits at that position.
				
				Starting from the least significant digit, all the bars are 'binned' according to that digit's value. A bar's color changes to red when it's about to be moved to a new position based on its current digit's value. The bar's color then changes back to its original color once it has been placed at its correct position in that pass.
				
				The process repeats, moving to the next more significant digit, until the most significant digit is reached and all bars have been sorted.
				
				This means that numbers with the same value for the current digit being looked at will be grouped together. As the algorithm progresses to the next more significant digit, these groups are further divided based on that digit's value.
				
				By the end of the sorting process, the bars are fully sorted according to their value. Since each digit is handled separately, the final sorted sequence can be achieved more efficiently than comparison-based algorithms.`}
				codeBlock={`	function getMax(array, n) {
        let max = array[0];
        for (let i = 1; i < n; i++)
            if (array[i] > max)
                max = array[i];
        return max;
    }
    
    function countSort(array, n, exp) {
        let output = new Array(n);
        let count = new Array(10).fill(0);
    
        for (let i = 0; i < n; i++)
            count[Math.floor(array[i] / exp) % 10]++;
    
        for (let i = 1; i < 10; i++)
            count[i] += count[i - 1];
    
        for (let i = n - 1; i >= 0; i--) {
            output[count[Math.floor(array[i] / exp) % 10] - 1] = array[i];
            count[Math.floor(array[i] / exp) % 10]--;
        }
    
        for (let i = 0; i < n; i++)
            array[i] = output[i];
    }
    
    function radixsort(array, n) {
        let m = getMax(array, n);
    
        for (let exp = 1; Math.floor(m / exp) > 0; exp *= 10)
            countSort(array, n, exp);
    }
    
    radixsort(array, array.length);`}
				Sort={async function radixSort(
					barArray,
					setBarArray,
					highlightCode,
					SetBtnDis
				) {
					const delayTime = 50;
					const array = [...barArray];
					const arrayLen = array.length;

					function changeBarColors(barIndex, newColor) {
						const currentBar = document.getElementById(`4BarArray${barIndex}`);
						currentBar.style.backgroundColor = newColor;
					}

					async function countSort(exp) {
						let output = new Array(arrayLen);
						let count = new Array(10).fill(0);

						for (let i = 0; i < arrayLen; i++)
							count[Math.floor(array[i] / exp) % 10]++;

						for (let i = 1; i < 10; i++) count[i] += count[i - 1];

						for (let i = arrayLen - 1; i >= 0; i--) {
							output[count[Math.floor(array[i] / exp) % 10] - 1] = array[i];
							count[Math.floor(array[i] / exp) % 10]--;
						}

						for (let i = 0; i < arrayLen; i++) {
							if (array[i] !== output[i]) {
								changeBarColors(i, "rgb(255, 0, 0)");
								await Delay(DelayTime);
								array[i] = output[i];
								setBarArray([...array]);
								changeBarColors(i, "rgb(84, 84, 228)");
							}
							//console.log(array[i] + " " + i);
							if (array[i] == 41 && i == 40) {
								console.log("end");
								SetBtnDis(false);
							}
						}
					}

					function getMax() {
						let max = array[0];
						for (let i = 1; i < arrayLen; i++)
							if (array[i] > max) max = array[i];
						return max;
					}

					let m = getMax();

					for (let exp = 1; Math.floor(m / exp) > 0; exp *= 10) {
						await countSort(exp);
						await Delay(DelayTime);
					}
				}}
			></SortAlgoVis>
		</div>
	);
}

export default SortingAlgorithms;
