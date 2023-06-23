import "./SearchAlgorithms.css";
import SearchVis from "./SearchVis";
function SearchAlgorithms() {
	return (
		<div className="SearchAlgorithms">
			<div className="SearchAlgorithmsTitle">Search Algorithms</div>
			<SearchVis
				SearchFunction={async function LinearSearch(
					array,
					CodeHighlightIndex,
					forceUpdate,
					Delay,
					delay
				) {
					for (let i = 0; i < array.length; i++) {
						document.getElementById(
							"Code" + CodeHighlightIndex
						).style.backgroundColor = "rgba(49, 78, 136, 0)";
						CodeHighlightIndex = 0;
						document.getElementById(
							"Code" + CodeHighlightIndex
						).style.backgroundColor = "rgba(49, 78, 136, 1)";

						document.getElementById("SearchVisNum" + i).style.backgroundColor =
							"rgba(0, 150, 0, 1)";
						if (i > 0) {
							document.getElementById(
								"SearchVisNum" + (i - 1)
							).style.backgroundColor = "rgba(0, 150, 0, 0)";
							document.getElementById("SearchVisNum" + (i - 1)).style.color =
								"rgba(100,100,100,1)";
						}

						forceUpdate();
						await Delay(delay);
						document.getElementById(
							"Code" + CodeHighlightIndex
						).style.backgroundColor = "rgba(49, 78, 136, 0)";
						CodeHighlightIndex = 1;
						document.getElementById(
							"Code" + CodeHighlightIndex
						).style.backgroundColor = "rgba(49, 78, 136, 1)";

						forceUpdate();
						await Delay(delay);

						if (array[i] == 9) {
							document.getElementById(
								"Code" + CodeHighlightIndex
							).style.backgroundColor = "rgba(49, 78, 136, 0)";
							CodeHighlightIndex = 2;
							document.getElementById(
								"Code" + CodeHighlightIndex
							).style.backgroundColor = "rgba(49, 78, 136, 1)";

							forceUpdate();
							return array[i];
						}
						document.getElementById(
							"Code" + CodeHighlightIndex
						).style.backgroundColor = "rgba(49, 78, 136, 0)";
						CodeHighlightIndex = 4;
						document.getElementById(
							"Code" + CodeHighlightIndex
						).style.backgroundColor = "rgba(49, 78, 136, 1)";

						forceUpdate();
						await Delay(delay);
					}
				}}
				Id={0}
				Title="Linear Search"
				CodeArray={[
					{
						Tab: 0,
						string: "for (let i = 0; i < array.length; i++) {",
						HighLight: 0,
					},
					{ Tab: 50, string: "if (array[i] == 9) { ", HighLight: 0 },
					{ Tab: 100, string: "return array[i];", HighLight: 0 },
					{ Tab: 50, string: "}", HighLight: 0 },
					{ Tab: 0, string: "}", HighLight: 0 },
				]}
				Description="The Linear Search sequentially checks each element of the list until a match is found or the whole list has been searched"
			></SearchVis>
		</div>
	);
}

export default SearchAlgorithms;
