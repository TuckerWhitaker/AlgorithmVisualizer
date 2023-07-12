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
	const [HighlightedLines, SetHighlightedLines] = useState([]);

	function highlightCode(i) {
		SetHighlightedLines([i]);
	}

	const [BarArray, SetBarArray] = useState([]);

	useEffect(() => {
		CodeArray = props.CodeArray;
		for (let i = 0; i < 40; i++) {
			BarArray.push(Math.floor(Math.random() * 60) + 2);
		}
		SetBarArray([...BarArray]);
	}, []);

	return (
		<div className="SortAlgoVis">
			<div className="SortAlgoVisTitle">{props.Title}</div>

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
					<Highlight code={codeBlock} language="jsx" theme={themes.vsDark}>
						{({ className, style, tokens, getLineProps, getTokenProps }) => (
							<pre className={className} style={{ ...style, padding: "20px" }}>
								{tokens.map((line, i) => {
									let lineProps = getLineProps({ line, key: i });

									// Check if line number is in the array of highlighted lines
									if (HighlightedLines.includes(i)) {
										// Add a custom style or class to the lineProps
										lineProps.style = {
											...lineProps.style,
											backgroundColor: "rgba(173, 216, 230, 0.3)",
										}; // for example
									}

									return (
										<div key={i} {...lineProps}>
											<span>{i + 1}</span>
											{line.map((token, key) => {
												// Override the text-shadow style in each token
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
				onClick={() => {
					props.Sort(BarArray, SetBarArray, highlightCode);
				}}
			>
				button
			</button>
		</div>
	);
}

export default SortAlgoVis;
