import { Highlight, themes } from "prism-react-renderer";
import Prism from "prismjs";
import { useEffect, useState } from "react";

let CodeArray = [];
function SortAlgoVis(props) {
	const [HighlightedLines, SetHighlightedLines] = useState([]);

	function highlightCode(i) {
		SetHighlightedLines([i]);
	}

	const [BarArray, SetBarArray] = useState([]);

	useEffect(() => {
		CodeArray = props.codeBlock;
		for (let i = 1; i <= 41; i++) {
			BarArray.push(i);
			//BarArray.push(Math.floor(Math.random() * 60) + 2);
		}

		var currentIndex = BarArray.length,
			temporaryValue,
			randomIndex;

		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = BarArray[currentIndex];
			BarArray[currentIndex] = BarArray[randomIndex];
			BarArray[randomIndex] = temporaryValue;
		}

		SetBarArray([...BarArray]);
	}, []);

	return (
		<div className="SortAlgoVis" id={props.id}>
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
					props.Sort(BarArray, SetBarArray, highlightCode);
				}}
			>
				Sort
			</button>
		</div>
	);
}

export default SortAlgoVis;
