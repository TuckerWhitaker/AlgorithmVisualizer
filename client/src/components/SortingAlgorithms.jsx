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
				Description={`Bubble sort is a simple sorting algorithm that works by repeatedly stepping through the list of items to be sorted, comparing each pair of adjacent items and swapping them if they are in the wrong order. This process continues until the list is sorted.`}
				TimeComplexity={"O(n²), with worst case n^2"}
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
						await highlightCode(0, DelayTime);
						if (i < arrayLen) {
							await highlightCode(1, DelayTime);

							if (j < arrayLen - i - 1) {
								await highlightCode(2, DelayTime);

								if (array[j] > array[j + 1]) {
									await highlightCode(3, DelayTime);

									await highlightCode(4, DelayTime);

									await highlightCode(5, DelayTime);

									changeBarColors(j, "rgb(255,0,0)", "rgb(84, 84, 228)");
									await Delay(DelayTime);

									await startSwapAnimation(j, j + 1, 0);

									[array[j], array[j + 1]] = [array[j + 1], array[j]];
									await highlightCode(6, DelayTime);

									setBarArray([...array]);
								}

								await highlightCode(6, DelayTime);
								setTimeout(() => bubbleSortHelper(i, j + 1), 10);
								await highlightCode(7, DelayTime);
							} else {
								await highlightCode(7, DelayTime);

								await highlightCode(8, DelayTime);

								changeBarColors(j, "rgb(255,0,0)", "rgb(84, 84, 228)");
								setTimeout(() => bubbleSortHelper(i + 1, 0), 10);
							}
						} else {
							await highlightCode(9, DelayTime);

							console.log("Sorting done.", array);
							SetBtnDis(false);
						}
					}

					await highlightCode(0, DelayTime);

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
				Description={
					"Selection sort is a simple sorting algorithm that works by repeatedly stepping through the list of items to be sorted, selecting the smallest (or largest, depending on the sorting order) item and swapping it with the first unsorted item. This process continues until the list is sorted."
				}
				TimeComplexity={"O(n²), with worst case n^2"}
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
							await highlightCode(1, DelayTime);

							let BarMinIndex = 1;
							let minIndex = i;

							for (let j = i + 1; j < arrayLen; j++) {
								changeBarColors(j, "rgb(0,255,0)", "rgb(84, 84, 228)");
								document.getElementById(
									`1BarArray${minIndex}`
								).style.backgroundColor = "rgb(200, 200, 0)";
								await highlightCode(2, DelayTime);

								await highlightCode(3, DelayTime);

								if (array[j] < array[minIndex]) {
									document.getElementById(
										`1BarArray${minIndex}`
									).style.backgroundColor = "rgb(84, 84, 228)";
									minIndex = j;

									await highlightCode(4, DelayTime);
								}

								await highlightCode(5, DelayTime);
							}
							document.getElementById(
								`1BarArray${minIndex}`
							).style.backgroundColor = "rgb(84, 84, 228)";

							await highlightCode(6, DelayTime);

							if (minIndex != i) {
								await startSwapAnimation(i, minIndex, 1);

								await highlightCode(6, DelayTime);
								let temp = array[i];
								array[i] = array[minIndex];
								array[minIndex] = temp;
								setBarArray([...array]);

								await highlightCode(7, DelayTime);

								await highlightCode(8, DelayTime);

								await highlightCode(9, DelayTime);
							}

							document.getElementById(
								`1BarArray${minBarIndex}`
							).style.backgroundColor = "rgb(84, 84, 228)";
							document.getElementById(`1BarArray${i}`).style.backgroundColor =
								"rgb(255,0,0)";
							minBarIndex = i;
							await highlightCode(10, DelayTime);

							//changeBarColors(i, "rgb(255,0,0)", "rgb(84, 84, 228)");
							setTimeout(() => selectionSortHelper(i + 1), 10);
						} else {
							console.log("Sorting done.");
							SetBtnDis(false);
						}
					}

					await highlightCode(0, DelayTime);

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
				Description={
					"Heap sort is a comparison-based sorting algorithm that utilizes a binary heap data structure. It works by transforming the list into a max heap, where the greatest element is the root of the heap. After that, the root is swapped with the last item of the heap, effectively placing it in its correct sorted position. The heap is then reduced by one element, and the max heap property is restored. This process is repeated until the heap is reduced to a single element, at which point all elements have been sorted."
				}
				TimeComplexity={"O(n log n), with worst case n*log(n)"}
				codeBlock={`function heapify(array, heapSize, i) {
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
						await highlightCode(0, DelayTime);
						await highlightCode(1, DelayTime);
						await highlightCode(2, DelayTime);
						await highlightCode(3, DelayTime);
						await highlightCode(4, DelayTime);
						let max = i;
						let left = 2 * i + 1;
						let right = 2 * i + 2;
						await highlightCode(5, DelayTime);
						if (left < heapSize && array[left] > array[max]) {
							max = left;
							await highlightCode(6, DelayTime);
						}
						await highlightCode(7, DelayTime);
						await highlightCode(8, DelayTime);
						if (right < heapSize && array[right] > array[max]) {
							max = right;
							await highlightCode(9, DelayTime);
						}
						await highlightCode(10, DelayTime);
						await highlightCode(11, DelayTime);
						if (max !== i) {
							await highlightCode(12, DelayTime);
							await highlightCode(13, DelayTime);
							await highlightCode(14, DelayTime);
							await highlightCode(15, DelayTime);
							await startSwapAnimation(i, max, 2);
							let temp = array[i];
							array[i] = array[max];
							array[max] = temp;
							setBarArray([...array]);
							await heapify(heapSize, max);
						}
						await highlightCode(16, DelayTime);
					}
					await highlightCode(17, DelayTime);
					await highlightCode(18, DelayTime);

					for (let i = Math.floor(arrayLen / 2 - 1); i >= 0; i--) {
						await highlightCode(19, DelayTime);
						await highlightCode(20, DelayTime);
						await highlightCode(21, DelayTime);
						changeBarColors(i, "rgb(0,255,0)", "rgb(84, 84, 228)");
						await heapify(arrayLen, i);
					}
					await highlightCode(22, DelayTime);

					for (let i = arrayLen - 1; i >= 0; i--) {
						await highlightCode(23, DelayTime);
						await highlightCode(24, DelayTime);
						await highlightCode(25, DelayTime);
						await highlightCode(26, DelayTime);
						await highlightCode(27, DelayTime);
						await highlightCode(28, DelayTime);
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
				Description={
					"Quick sort is a highly efficient sorting algorithm and is based on the partitioning of an array of data into smaller arrays. A large array is partitioned into two arrays, one of which holds values smaller than the specified value, say pivot, based on which the partition is made, and another array holds values greater than the pivot value. This process is repeated for each sub-array until the array is sorted."
				}
				TimeComplexity={"O(n log n), with worst case O(n²)"}
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
						await highlightCode(0, DelayTime);
						await highlightCode(1, DelayTime);
						if (start < end) {
							await highlightCode(2, DelayTime);
							await highlightCode(3, DelayTime);
							await highlightCode(4, DelayTime);
							await highlightCode(5, DelayTime);
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
						await highlightCode(6, DelayTime);
						if (start == 0 && end == 40) {
							console.log("End");
							SetBtnDis(false);
						}
						await highlightCode(7, DelayTime);
					}
					await highlightCode(8, DelayTime);

					async function partitionHelper(start, end) {
						await highlightCode(9, DelayTime);
						await highlightCode(10, DelayTime);
						await highlightCode(11, DelayTime);
						await highlightCode(12, DelayTime);
						let pivotValue = array[end];
						let pivotIndex = start;

						for (let i = start; i < end; i++) {
							await highlightCode(13, DelayTime);
							await highlightCode(14, DelayTime);
							changeBarColors(i, "rgb(0,255,0)", "rgb(84, 84, 228)");

							if (array[i] < pivotValue) {
								await highlightCode(15, DelayTime);
								await highlightCode(16, DelayTime);
								await startSwapAnimation(i, pivotIndex, 3);
								await Delay(DelayTime);
								[array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
								pivotIndex++;
								setBarArray([...array]);
							}
							await highlightCode(17, DelayTime);
							await highlightCode(18, DelayTime);
						}
						await highlightCode(19, DelayTime);
						await highlightCode(20, DelayTime);
						await highlightCode(21, DelayTime);
						await highlightCode(22, DelayTime);
						await highlightCode(23, DelayTime);
						await startSwapAnimation(pivotIndex, end, 3);
						[array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];

						setBarArray([...array]);
						await highlightCode(5, DelayTime);

						return pivotIndex;
					}
					await highlightCode(24, DelayTime);

					await highlightCode(0, DelayTime);

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
				Description={
					"Radix sort is a non-comparative sorting algorithm that sorts data with integer keys by grouping keys by the individual digits which share the same significant position and value. It starts with the least significant digit and moves towards the most significant one. This process is repeated until all digits have been considered, resulting in a sorted list."
				}
				TimeComplexity={"O(nk), with worst case n*k/d"}
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
					await highlightCode(34, DelayTime);
					const delayTime = 50;
					const array = [...barArray];
					const arrayLen = array.length;

					function changeBarColors(barIndex, newColor) {
						const currentBar = document.getElementById(`4BarArray${barIndex}`);
						currentBar.style.backgroundColor = newColor;
					}

					async function countSort(exp) {
						await highlightCode(8, DelayTime);
						await highlightCode(9, DelayTime);
						await highlightCode(10, DelayTime);
						await highlightCode(11, DelayTime);

						let output = new Array(arrayLen);
						let count = new Array(10).fill(0);

						for (let i = 0; i < arrayLen; i++) {
							await highlightCode(12, DelayTime);
							await highlightCode(13, DelayTime);
							count[Math.floor(array[i] / exp) % 10]++;
						}

						await highlightCode(14, DelayTime);
						for (let i = 1; i < 10; i++) {
							await highlightCode(15, DelayTime);
							await highlightCode(16, DelayTime);
							count[i] += count[i - 1];
						}
						await highlightCode(17, DelayTime);

						for (let i = arrayLen - 1; i >= 0; i--) {
							await highlightCode(18, DelayTime);
							await highlightCode(19, DelayTime);
							await highlightCode(20, DelayTime);
							await highlightCode(21, DelayTime);

							output[count[Math.floor(array[i] / exp) % 10] - 1] = array[i];
							count[Math.floor(array[i] / exp) % 10]--;
						}
						await highlightCode(22, DelayTime);

						for (let i = 0; i < arrayLen; i++) {
							await highlightCode(23, DelayTime);
							await highlightCode(24, DelayTime);

							if (array[i] !== output[i]) {
								changeBarColors(i, "rgb(255, 0, 0)");
								await Delay(DelayTime);
								array[i] = output[i];
								setBarArray([...array]);
								changeBarColors(i, "rgb(84, 84, 228)");
							}

							if (array[i] == 41 && i == 40) {
								console.log("end");
								SetBtnDis(false);
							}
						}
						await highlightCode(25, DelayTime);
					}

					async function getMax() {
						await highlightCode(0, DelayTime);
						await highlightCode(1, DelayTime);
						let max = array[0];
						for (let i = 1; i < arrayLen; i++) {
							await highlightCode(2, DelayTime);
							await highlightCode(3, DelayTime);

							if (array[i] > max) {
								await highlightCode(4, DelayTime);
								max = array[i];
							}
						}
						await highlightCode(5, DelayTime);
						await highlightCode(6, DelayTime);
						return max;
					}

					await highlightCode(27, DelayTime);
					await highlightCode(28, DelayTime);
					await highlightCode(29, DelayTime);
					let m = await getMax();

					for (let exp = 1; Math.floor(m / exp) > 0; exp *= 10) {
						await highlightCode(30, DelayTime);
						await highlightCode(31, DelayTime);
						await highlightCode(32, DelayTime);
						await countSort(exp);
						await Delay(DelayTime);
					}
				}}
			></SortAlgoVis>
		</div>
	);
}

export default SortingAlgorithms;
