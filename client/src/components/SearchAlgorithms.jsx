import "./SearchAlgorithms.css";
import SearchVis from "./SearchVis";
function SearchAlgorithms() {
	return (
		<div className="SearchAlgorithms">
			<div className="SearchAlgorithmsTitle">Search Algorithms</div>
			<SearchVis
				VisID={0}
				SearchFunction={async function LinearSearch(
					array,
					Delay,
					delay,
					HighLightCode,
					HighLightNumber,
					GrayOutNumber
				) {
					for (let i = 0; i < array.length; i++) {
						HighLightCode(0);
						if (i > 0) {
							GrayOutNumber(i - 1);
						}
						HighLightNumber(i);

						await Delay(delay);

						HighLightCode(1);

						await Delay(delay);

						if (array[i] == 36) {
							HighLightCode(2);
							return array[i];
						}
						HighLightCode(4);

						await Delay(delay);
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
				VisID={1}
				SearchFunction={async function BinarySearch(
					array,
					Delay,
					delay,
					HighLightCode,
					HighLightNumber,
					GrayOutNumber,
					Target
				) {
					let left = 0;
					let right = array.length - 1;

					HighLightCode(0);
					await Delay(delay / 2);
					HighLightCode(1);
					await Delay(delay / 2);

					while (left <= right) {
						HighLightCode(2);
						await Delay(delay);
						const mid = Math.floor((left + right) / 2);
						HighLightCode(3);
						await Delay(delay);
						HighLightNumber(mid);
						HighLightCode(4);
						await Delay(delay);
						if (array[mid] === Target) {
							HighLightCode(5);
							await Delay(delay);
							for (let i = 0; i < mid; i++) {
								GrayOutNumber(i);
							}
							for (let i = mid + 1; i < array.length; i++) {
								GrayOutNumber(i);
							}
							return mid;
						}
						HighLightCode(6);
						await Delay(delay);
						HighLightCode(7);
						await Delay(delay);
						if (array[mid] < Target) {
							HighLightCode(8);
							await Delay(delay);
							for (let i = 0; i < mid; i++) {
								GrayOutNumber(i);
							}

							left = mid + 1;
							HighLightCode(9);
							await Delay(delay);
						} else {
							HighLightCode(9);
							await Delay(delay);
							HighLightCode(10);
							await Delay(delay);
							HighLightCode(11);
							await Delay(delay);
							for (let i = mid + 1; i < array.length; i++) {
								GrayOutNumber(i);
							}
							right = mid - 1;
							HighLightCode(12);
							await Delay(delay);
						}
						HighLightCode(13);
						await Delay(delay);
					}
				}}
				Id={0}
				Title="Binary Search"
				simplified={false}
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
		</div>
	);
}

export default SearchAlgorithms;
