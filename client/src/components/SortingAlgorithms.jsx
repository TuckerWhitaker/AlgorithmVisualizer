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
				Sort={async function sort(BarArray, SetBarArray) {
					let lastBarHighlight = 0;
					let CodeHighlightIndex = 0;

					let delay = 20;

					let array = [...BarArray];
					let len = array.length;

					function HighLightCode(newHighlight) {
						document.getElementById(
							0 + "Code" + CodeHighlightIndex
						).style.backgroundColor = "rgba(49, 78, 136, 0)";
						document.getElementById(
							0 + "Code" + newHighlight
						).style.backgroundColor = "rgba(49, 78, 136, 1)";
						CodeHighlightIndex = newHighlight;
					}

					HighLightCode(0);
					await Delay(delay);
					async function sort(i, j) {
						if (i < len) {
							HighLightCode(1);
							await Delay(delay);
							if (j < len - i - 1) {
								HighLightCode(2);
								await Delay(delay);
								if (array[j] > array[j + 1]) {
									HighLightCode(3);
									await Delay(delay);
									HighLightCode(4);
									await Delay(delay);
									HighLightCode(5);
									await Delay(delay);
									[array[j], array[j + 1]] = [array[j + 1], array[j]];
									SetBarArray([...array]);
								}
								HighLightCode(6);
								await Delay(delay);
								document.getElementById(
									0 + "BarArray" + j
								).style.backgroundColor = "rgb(255,0,0)";
								document.getElementById(
									0 + "BarArray" + lastBarHighlight
								).style.backgroundColor = "rgb(84, 84, 228)";
								lastBarHighlight = j;

								setTimeout(() => sort(i, j + 1), 10);
								HighLightCode(7);
								await Delay(delay);
							} else {
								HighLightCode(7);
								await Delay(delay);
								HighLightCode(8);
								await Delay(delay);
								document.getElementById(
									0 + "BarArray" + j
								).style.backgroundColor = "rgb(255,0,0)";
								document.getElementById(
									0 + "BarArray" + lastBarHighlight
								).style.backgroundColor = "rgb(84, 84, 228)";
								lastBarHighlight = j;
								setTimeout(() => sort(i + 1, 0), 10);
							}
						} else {
							HighLightCode(9);
							await Delay(delay);
							console.log("Sorting done.", array);
						}
					}

					sort(0, 0);
				}}
			></SortAlgoVis>
		</div>
	);
}

export default SortingAlgorithms;
