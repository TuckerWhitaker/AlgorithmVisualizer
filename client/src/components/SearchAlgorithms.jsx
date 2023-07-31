import "./SearchAlgorithms.css";
import SearchVis from "./SearchVis";
let selectedAlgoIndex = 0;

let DelayTime = 25;
const SelectAlgo = (Index) => {
	document.getElementById("SearchAlgoVis" + selectedAlgoIndex).style.display =
		"none";
	document.getElementById("SearchAlgoVis" + Index).style.display = "flex";
	selectedAlgoIndex = Index;
};
const CodeBlocks = [
	` let left = 0;
 let right = array.length - 1;
 while (left <= right) {
		const mid = Math.floor((left + right) / 2);
		if (array[mid] === Target) {
			return mid;
		}
		if (array[mid] < Target) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
 }`,
	` let left = 0;
 let right = array.length - 1;
 while (left <= right) {
		const mid = Math.floor((left + right) / 2);
		if (array[mid] === Target) {
			return mid;
		}
		if (array[mid] < Target) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
 }`,
	` let start = 0;
 let end = arr.length - 1;
 while (start <= end && key >= arr[start] && key <= arr[end]) {
		if (start === end) {
			if (arr[start] === key) return start;
			return -1;
		}
		let pos =
			start + ((end - start) * (key - arr[start])) / (arr[end] - arr[start]);
		pos = Math.floor(pos);
		if (arr[pos] === key) return pos;
		if (arr[pos] < key) {
			start = pos + 1;
		} else {
			end = pos - 1;
		}
 }`,
];

function SearchAlgorithms() {
	return (
		<div className="SearchAlgorithms">
			<div className="SortingAlgorithmNavBar">
				<button
					className="SortingAlgorithmNavBarButton"
					onClick={() => {
						SelectAlgo(0);
					}}
				>
					Linear Search
				</button>
				<button
					className="SortingAlgorithmNavBarButton"
					onClick={() => {
						SelectAlgo(1);
					}}
				>
					Binary Search
				</button>
				<button
					className="SortingAlgorithmNavBarButton"
					onClick={() => {
						SelectAlgo(2);
					}}
				>
					Interpolation Search
				</button>
			</div>
			<SearchVis
				SetDelay={(d) => {
					DelayTime = d;
				}}
				id={"SearchAlgoVis" + 0}
				VisID={0}
				codeBlock={CodeBlocks[0]}
				SearchFunction={async function LinearSearch(
					array,
					Delay,
					delay,
					HighLightCode,
					HighLightNumber,
					GrayOutNumber,
					Target,
					SetBtnDis
				) {
					for (let i = 0; i < array.length; i++) {
						HighLightCode(0);
						if (i > 0) {
							await GrayOutNumber(i - 1);
						}
						await HighLightNumber(i);

						await Delay(DelayTime);

						HighLightCode(1);

						await Delay(DelayTime);

						if (array[i] == Target) {
							HighLightCode(2);

							for (let j = array.length; j > i; j--) {
								await Delay(DelayTime / 2);
								await GrayOutNumber(j);
							}

							SetBtnDis(false);
							return array[i];
						}
						HighLightCode(4);

						await Delay(DelayTime);
					}
				}}
				Id={0}
				Title="Linear Search"
				simplified={false}
				SimplifiedCodeArray={[
					{
						Tab: 0,
						string: "for the item in the i positon, do the following { ",
						HighLight: 0,
					},
					{
						Tab: 50,
						string: "If (the item in the i position is equal to 36) {",
						HighLight: 0,
					},
					{ Tab: 100, string: "then we found the number", HighLight: 0 },
					{ Tab: 50, string: "}", HighLight: 0 },
					{
						Tab: 0,
						string: "} Go back to the first line and increase i by one",
						HighLight: 0,
					},
				]}
				CodeArray={[
					{
						Tab: 0,
						string: "for (let i = 0; i < array.length; i++) {",
						HighLight: 0,
					},
					{ Tab: 50, string: "if (array[i] == 36) { ", HighLight: 0 },
					{ Tab: 100, string: "return array[i];", HighLight: 0 },
					{ Tab: 50, string: "}", HighLight: 0 },
					{ Tab: 0, string: "}", HighLight: 0 },
				]}
				Description="The Linear Search sequentially checks each element of the list until a match is found or the whole list has been searched"
			></SearchVis>
			<SearchVis
				SetDelay={(d) => {
					DelayTime = d;
				}}
				id={"SearchAlgoVis" + 1}
				codeBlock={CodeBlocks[1]}
				VisID={1}
				SearchFunction={async function BinarySearch(
					array,
					Delay,
					delay,
					HighLightCode,
					HighLightNumber,
					GrayOutNumber,
					Target,
					SetBtnDis
				) {
					let left = 0;
					let right = array.length - 1;

					HighLightCode(0);
					await Delay(DelayTime / 2);
					HighLightCode(1);
					await Delay(DelayTime / 2);

					while (left <= right) {
						if (right - left < 2) {
							SetBtnDis(false);
						}
						HighLightCode(2);
						await Delay(DelayTime);
						const mid = Math.floor((left + right) / 2);
						HighLightCode(3);
						await Delay(DelayTime);
						await HighLightNumber(mid);
						HighLightCode(4);
						await Delay(DelayTime);
						if (array[mid] === Target) {
							HighLightCode(5);
							await Delay(DelayTime);
							for (let i = 0; i < mid; i++) {
								await Delay(DelayTime / 2);
								await GrayOutNumber(i);
							}
							for (let i = mid + 1; i < array.length; i++) {
								await Delay(DelayTime / 2);
								await GrayOutNumber(i);
							}
							return mid;
						}
						HighLightCode(6);
						await Delay(DelayTime);
						HighLightCode(7);
						await Delay(DelayTime);

						if (array[mid] == Target) {
							console.log("Target");
						}
						if (array[mid] < Target) {
							HighLightCode(8);
							await Delay(DelayTime);
							for (let i = 0; i < mid; i++) {
								await Delay(DelayTime / 2);
								await GrayOutNumber(i);
							}

							left = mid + 1;
							HighLightCode(9);
							await Delay(DelayTime);
						} else {
							HighLightCode(9);
							await Delay(DelayTime);
							HighLightCode(10);
							await Delay(DelayTime);
							HighLightCode(11);
							await Delay(DelayTime);
							for (let i = mid + 1; i < array.length; i++) {
								await Delay(DelayTime / 2);
								await GrayOutNumber(i);
							}
							right = mid - 1;
							HighLightCode(12);
							await Delay(DelayTime);
						}

						HighLightCode(13);
						await Delay(DelayTime);
					}
				}}
				Id={0}
				Title="Binary Search"
				simplified={false}
				SimplifiedCodeArray={[
					{
						Tab: 0,
						string: "Initialize left to 0, and right to size of array - 1",
						HighLight: 0,
					},
					{
						Tab: 0,
						string:
							"For the item at position 'mid', where mid is the floor of (left + right) / 2, do the following {",
						HighLight: 0,
					},
					{
						Tab: 50,
						string: "If (the item at mid position is equal to target) {",
						HighLight: 0,
					},
					{
						Tab: 100,
						string: "then we found the target",
						HighLight: 0,
					},
					{
						Tab: 50,
						string: "}",
						HighLight: 0,
					},
					{
						Tab: 50,
						string: "If (the item at mid position is less than target) {",
						HighLight: 0,
					},
					{
						Tab: 100,
						string: "then set left to mid + 1",
						HighLight: 0,
					},
					{
						Tab: 50,
						string: "}",
						HighLight: 0,
					},
					{
						Tab: 50,
						string: "Else {",
						HighLight: 0,
					},
					{
						Tab: 100,
						string: "set right to mid - 1",
						HighLight: 0,
					},
					{
						Tab: 50,
						string: "}",
						HighLight: 0,
					},
					{
						Tab: 0,
						string:
							"} Go back to the second line and repeat until left is less than or equal to right",
						HighLight: 0,
					},
				]}
				CodeArray={[
					{ Tab: 0, string: "let left = 0;", HighLight: 0 },
					{ Tab: 0, string: "let right = array.length - 1;", HighLight: 0 },
					{ Tab: 0, string: "while (left <= right) {", HighLight: 0 },

					{
						Tab: 50,
						string: "const mid = Math.floor((left + right) / 2);",
						HighLight: 0,
					},
					{ Tab: 50, string: "if (array[mid] === Target) {", HighLight: 0 },
					{ Tab: 100, string: "return mid;", HighLight: 0 },
					{ Tab: 50, string: "}", HighLight: 0 },
					{ Tab: 50, string: "if (array[mid] < Target) {", HighLight: 0 },
					{ Tab: 100, string: "left = mid + 1;", HighLight: 0 },
					{ Tab: 50, string: "}", HighLight: 0 },
					{ Tab: 50, string: "else {", HighLight: 0 },
					{ Tab: 100, string: "right = mid - 1;", HighLight: 0 },
					{ Tab: 50, string: "}", HighLight: 0 },
					{ Tab: 0, string: "}", HighLight: 0 },
				]}
				Description="The Binary Search operates by repetitively dividing a sorted list in half until the desired element is located or the subset is empty. It starts by comparing the middle item of the list with the search item; if they don't match, the half in which the search item cannot lie is eliminated. This process is continually iterated until a match is discovered or the list is exhausted, making the binary search a highly efficient searching technique.




				"
			></SearchVis>
			<SearchVis
				SetDelay={(d) => {
					DelayTime = d;
				}}
				id={"SearchAlgoVis" + 2}
				codeBlock={CodeBlocks[2]}
				VisID={2}
				SearchFunction={async function InterpolationSearch(
					array,
					Delay,
					delay,
					HighLightCode,
					HighLightNumber,
					GrayOutNumber,
					Target,
					SetBtnDis
				) {
					let start = 0;
					let end = array.length - 1;

					HighLightCode(0);
					await Delay(DelayTime / 2);
					HighLightCode(1);
					await Delay(DelayTime / 2);
					HighLightCode(2);
					await Delay(DelayTime);

					while (
						start <= end &&
						Target >= array[start] &&
						Target <= array[end]
					) {
						HighLightCode(3);
						await Delay(DelayTime);

						if (start === end) {
							HighLightCode(4);
							await Delay(DelayTime);

							if (array[start] === Target) {
								HighLightCode(5);
								await Delay(DelayTime);
								return start;
							}

							HighLightCode(6);
							await Delay(DelayTime);
							return -1;
						}

						let pos =
							start +
							((end - start) * (Target - array[start])) /
								(array[end] - array[start]);
						pos = Math.floor(pos);
						HighLightCode(7);
						await Delay(DelayTime);
						await HighLightNumber(pos);

						if (array[pos] === Target) {
							HighLightCode(8);
							await Delay(DelayTime);

							for (let i = 0; i < pos; i++) {
								await Delay(DelayTime / 2);
								await GrayOutNumber(i);
							}

							for (let i = pos + 1; i < array.length; i++) {
								await Delay(DelayTime / 2);
								await GrayOutNumber(i);
							}
							HighLightCode(9);
							await Delay(DelayTime);
							SetBtnDis(false);
							return pos;
						}

						if (array[pos] < Target) {
							HighLightCode(10);
							await Delay(DelayTime);

							for (let i = 0; i < pos; i++) {
								await Delay(DelayTime / 2);
								await GrayOutNumber(i);
							}

							start = pos + 1;
							HighLightCode(11);
							await Delay(DelayTime);
						} else {
							HighLightCode(12);
							await Delay(DelayTime);
							end = pos - 1;
						}
						HighLightCode(13);
						await Delay(DelayTime);
					}
					HighLightCode(14);
					await Delay(DelayTime);
				}}
				Id={0}
				Title="Interpolation Search"
				simplified={false}
				CodeArray={[
					{ Tab: 0, string: "let start = 0;", HighLight: 0 },
					{ Tab: 0, string: "let end = arr.length - 1;", HighLight: 0 },
					{
						Tab: 0,
						string:
							"while (start <= end && key >= arr[start] && key <= arr[end]) {",
						HighLight: 0,
					},
					{ Tab: 50, string: "if (start === end) {", HighLight: 0 },
					{
						Tab: 100,
						string: "if (arr[start] === key) return start;",
						HighLight: 0,
					},
					{ Tab: 100, string: "return -1;", HighLight: 0 },
					{ Tab: 50, string: "}", HighLight: 0 },
					{
						Tab: 50,
						string:
							"let pos = start + ((end - start) * (key - arr[start])) / (arr[end] - arr[start]);",
						HighLight: 0,
					},
					{ Tab: 50, string: "pos = Math.floor(pos);", HighLight: 0 },
					{
						Tab: 50,
						string: "if (arr[pos] === key) return pos;",
						HighLight: 0,
					},
					{ Tab: 50, string: "if (arr[pos] < key) {", HighLight: 0 },
					{ Tab: 100, string: "start = pos + 1;", HighLight: 0 },
					{ Tab: 50, string: "}", HighLight: 0 },
					{ Tab: 50, string: "else {", HighLight: 0 },
					{ Tab: 100, string: "end = pos - 1;", HighLight: 0 },
					{ Tab: 50, string: "}", HighLight: 0 },
					{ Tab: 0, string: "}", HighLight: 0 },
				]}
				Description="Interpolation search is an algorithm used to find a specific key in a sorted array by calculating an estimate of the position of the key, based on the value of the key, and the values at the start and end of the search space. Instead of linearly or bisecting the search space, it uses a formula similar to the one used in linear interpolation, which is more efficient for uniformly distributed data. This algorithm can provide faster results than binary search for large, uniformly distributed datasets, but can perform poorly if the data is not uniformly distributed."
			></SearchVis>
		</div>
	);
}

export default SearchAlgorithms;
