import { Highlight, themes } from "prism-react-renderer";
import React, { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./SearchVis.css";
let array = [
	1, 2, 3, 4, 7, 11, 15, 17, 21, 23, 24, 26, 29, 31, 34, 35, 36, 39, 41, 44, 45,
	52, 53, 59, 64, 65, 66, 70, 71, 75, 76, 79, 81, 86, 87, 91, 92, 95, 98, 99,
];

if (window.screen.width <= 500) {
	for (let i = 1; i < array.length; i += 2) {
		array.splice(i, 1);
	}
}

let delay = 500;

function Delay(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

let CodeArray = [];

function SearchVis(props) {
	const [HighlightedLines, SetHighlightedLines] = useState([]);

	useEffect(() => {
		SetTarget(array[Math.round(Math.random() * array.length)]);
	}, []);

	const [Target, SetTarget] = useState(0);

	CodeArray = props.CodeArray;

	if (props.simplified) {
		CodeArray = props.SimplifiedCodeArray;
		console.log("Simplified Code Array");
	}

	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);

	let CodeHighlightIndex = 0;
	let NumberHighlightIndex = 0;

	function HighLightCode(newHighlight) {
		SetHighlightedLines([newHighlight]);
	}

	async function GrayOutNumber(number) {
		document.getElementById(props.VisID + "SearchVisNum" + number).style.color =
			"rgba(100,100,100,1)";
		await Delay(500);
		document.getElementById(props.VisID + "SearchVisNum" + number).innerHTML =
			"";
		document
			.getElementById(props.VisID + "SearchVisNum" + number)
			.classList.add("SearchVisNumberOut");

		document.getElementById(props.VisID + "SearchVisNum" + number).style.color =
			"rgba(100,100,100,0)";

		await Delay(500);
		document.getElementById(props.VisID + "SearchVisNum" + number).remove();
	}

	function HighLightNumber(newHighlight) {
		document.getElementById(
			props.VisID + "SearchVisNum" + NumberHighlightIndex
		).style.backgroundColor = "rgba(49, 78, 136, 0)";
		document.getElementById(
			props.VisID + "SearchVisNum" + newHighlight
		).style.backgroundColor = "rgba(0, 150, 0, 1)";
		NumberHighlightIndex = newHighlight;
	}

	return (
		<div className="SearchVis">
			<div className="SearchVisTitle">{props.Title}</div>
			<div className="SearchVisNumberParent">
				{array.map((info, index) => {
					return (
						<div
							className="SearchVisNumber"
							key={index}
							style={{ backgroundColor: "rgba(0, 150, 0, 0)" }}
							id={props.VisID + "SearchVisNum" + index}
						>
							{info},
						</div>
					);
				})}
			</div>
			<div className="SearchVisInfo">
				<div className="SearchVisInfoHalf">{props.Description}</div>

				<div className="SearchVisInfoHalf SearchVisCode">
					<div>Target = {Target}</div>
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
				onClick={() => {
					props.SearchFunction(
						array,
						Delay,
						delay,
						HighLightCode,
						HighLightNumber,
						GrayOutNumber,
						Target
					);
				}}
			>
				Search
			</button>
		</div>
	);
}

export default SearchVis;
