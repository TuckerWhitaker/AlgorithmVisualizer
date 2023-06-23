import "./SearchAlgorithms.css";
import SearchVis from "./SearchVis";
function SearchAlgorithms() {
	return (
		<div className="SearchAlgorithms">
			<div className="SearchAlgorithmsTitle">Search Algorithms</div>
			<SearchVis
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

						if (array[i] == 9) {
							HighLightCode(2);
							return array[i];
						}
						HighLightCode(4);

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
