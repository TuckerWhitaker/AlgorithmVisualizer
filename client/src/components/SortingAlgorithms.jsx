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
			<SortAlgoVis
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
					DelaySlider
				) {
					let array = [...barArray];
					const arrayLen = array.length;

					function changeBarColors(barIndex, newColor, oldColor) {
						const currentBar = document.getElementById(`2BarArray${barIndex}`);
						if (currentBar) currentBar.style.backgroundColor = newColor;
						const maxBar = document.getElementById(`2BarArray0`);
						if (maxBar) maxBar.style.backgroundColor = oldColor;
					}

					async function startSwapAnimation(barIndex1, barIndex2) {
						const bar1 = document.getElementById(`2BarArray${barIndex1}`);
						const bar2 = document.getElementById(`2BarArray${barIndex2}`);

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
							await startSwapAnimation(i, max);
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
						await startSwapAnimation(0, i);
						let temp = array[0];
						array[0] = array[i];
						array[i] = temp;
						setBarArray([...array]);
						await heapify(i, 0);
					}

					console.log("Sorting done.");
				}}
			></SortAlgoVis>
			<SortAlgoVis
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
					DelaySlider
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

					async function startSwapAnimation(barIndex1, barIndex2) {
						const bar1 = document.getElementById(`3BarArray${barIndex1}`);
						const bar2 = document.getElementById(`3BarArray${barIndex2}`);

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

					async function quickSortHelper(start, end) {
						if (start < end) {
							let pivotIndex = await partitionHelper(start, end);
							document.getElementById(
								`3BarArray${pivotIndex}`
							).style.backgroundColor = "rgb(200, 200, 0)";
							//await Delay(DelaySlider);
							await quickSortHelper(start, pivotIndex - 1);
							await quickSortHelper(pivotIndex + 1, end);
							document.getElementById(
								`3BarArray${pivotIndex}`
							).style.backgroundColor = "rgb(84, 84, 228)";
						}
					}

					async function partitionHelper(start, end) {
						let pivotValue = array[end];
						let pivotIndex = start;

						for (let i = start; i < end; i++) {
							changeBarColors(i, "rgb(0,255,0)", "rgb(84, 84, 228)");

							highlightCode(1);
							await Delay(DelaySlider);

							if (array[i] < pivotValue) {
								await startSwapAnimation(i, pivotIndex);
								await Delay(DelaySlider);
								[array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
								pivotIndex++;
								setBarArray([...array]);

								highlightCode(2);
								await Delay(DelaySlider);
							}

							highlightCode(3);
							await Delay(DelaySlider);
						}

						await startSwapAnimation(pivotIndex, end);
						[array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];

						highlightCode(4);
						await Delay(DelaySlider);

						setBarArray([...array]);
						highlightCode(5);
						await Delay(DelaySlider);

						return pivotIndex;
					}

					highlightCode(0);
					await Delay(DelaySlider);
					quickSortHelper(0, arrayLen - 1);
				}}
			></SortAlgoVis>
			<SortAlgoVis
				VisID={4}
				Title="RadixSort"
				Description={`The Radix Sort algorithm sorts integers by processing individual digits. It exploits the fact that information about the size of a number is encoded in the number of digits. More efficient than comparison sorts, it operates on a per-digit basis, usually from least significant digit (LSD) to most significant digit (MSD).

				In our visualization, the algorithm moves through each digit place, grouping numbers by the value of their digits at that position.
				
				Starting from the least significant digit, all the bars are 'binned' according to that digit's value. A bar's color changes to red when it's about to be moved to a new position based on its current digit's value. The bar's color then changes back to its original color once it has been placed at its correct position in that pass.
				
				The process repeats, moving to the next more significant digit, until the most significant digit is reached and all bars have been sorted.
				
				This means that numbers with the same value for the current digit being looked at will be grouped together. As the algorithm progresses to the next more significant digit, these groups are further divided based on that digit's value.
				
				By the end of the sorting process, the bars are fully sorted according to their value. Since each digit is handled separately, the final sorted sequence can be achieved more efficiently than comparison-based algorithms.`}
				codeBlock={`
    function getMax(array, n) {
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
					DelaySlider
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
								await Delay(DelaySlider);
								array[i] = output[i];
								setBarArray([...array]);
								changeBarColors(i, "rgb(84, 84, 228)");
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
						await Delay(DelaySlider);
					}
				}}
			></SortAlgoVis>
		</div>
	);
}

export default SortingAlgorithms;
