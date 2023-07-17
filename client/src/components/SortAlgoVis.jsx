import { Highlight, themes } from "prism-react-renderer";
import Prism from "prismjs";
import { useEffect, useState } from "react";

const codeBlock = ` for (let i = 0; i < array.len; i++) {
	 for (let j = 0; j < array.len - i - 1; j++) {
	 	 if (array[j] > array[j + 1]) {
			 let temp = array[j];
			 array[j] = array[j + 1];
			 array[j + 1] = temp;
		 }
	 }
 }`;

let CodeArray = [];
function SortAlgoVis(props) {
	const [DelaySlider, SetDelaySlider] = useState(25);
	const [HighlightedLines, SetHighlightedLines] = useState([]);

	function highlightCode(i) {
		SetHighlightedLines([i]);
	}

	const [BarArray, SetBarArray] = useState([]);

	useEffect(() => {
		CodeArray = props.codeBlock;
		for (let i = 1; i <= 35; i++) {
			BarArray.push(i);
			//BarArray.push(Math.floor(Math.random() * 60) + 2);
		}

		var currentIndex = BarArray.length,
			temporaryValue,
			randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = BarArray[currentIndex];
			BarArray[currentIndex] = BarArray[randomIndex];
			BarArray[randomIndex] = temporaryValue;
		}

		SetBarArray([...BarArray]);
	}, []);

	return (
		<div className="SortAlgoVis">
			<div className="SortAlgoVisTitle">{props.Title}</div>
			<div className="SortAlgoVisDescTop">{props.Description}</div>
			<div className="SortAlgoVisGraph">
				{BarArray.map((info, index) => {
					return (
						<div
							className="SortAlgoVisGraphBar"
							id={props.VisID + "BarArray" + index}
							key={index}
							style={{ height: info / 2 + "vh" }}
						>
							{info}
						</div>
					);
				})}
			</div>
			<div className="SortAlgoVisBottomHalf">
				<div className="SortAlgoVisDesc">{props.Description}</div>
				<div className="SortAlgoVisCode">
					<Highlight
						code={props.codeBlock}
						language="jsx"
						theme={themes.vsDark}
					>
						{({ className, style, tokens, getLineProps, getTokenProps }) => (
							<pre className={className} style={{ ...style, padding: "20px" }}>
								{tokens.map((line, i) => {
									let lineProps = getLineProps({ line, key: i });

									if (HighlightedLines.includes(i)) {
										lineProps.style = {
											...lineProps.style,
											backgroundColor: "rgba(173, 216, 230, 0.3)",
										};
									}

									return (
										<div key={i} {...lineProps}>
											<span>{i + 1}</span>
											{line.map((token, key) => {
												let tokenProps = getTokenProps({ token });
												tokenProps.style = {
													...tokenProps.style,
													textShadow: "none",
												};

												return <span key={key} {...tokenProps} />;
											})}
										</div>
									);
								})}
							</pre>
						)}
					</Highlight>
				</div>
			</div>
			<button
				className="SortAlgoVisButton"
				onClick={() => {
					props.Sort(BarArray, SetBarArray, highlightCode, DelaySlider);
				}}
			>
				Sort
			</button>
			<input
				type="range"
				min="1"
				max="100"
				className="SortAlgoSlider"
				onChange={(e) => {
					SetDelaySlider(e.target.value);
				}}
			></input>
		</div>
	);
}

export default SortAlgoVis;
