import { Highlight, themes } from "prism-react-renderer";
import React, { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./SearchVis.css";

let delay = 500;

function Delay(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

let CodeArray = [];

function SearchVis(props) {
	const [Array, SetArray] = useState([
		1, 2, 3, 4, 7, 11, 15, 17, 21, 23, 24, 26, 29, 31, 34, 35, 36, 39, 41, 44,
		45, 52, 53, 59, 64, 65, 66, 70, 71, 75, 76, 79, 81, 86, 87, 91, 92, 95, 98,
		99,
	]);

	const ResetArray = () => {
		let array = [
			1, 2, 3, 4, 7, 11, 15, 17, 21, 23, 24, 26, 29, 31, 34, 35, 36, 39, 41, 44,
			45, 52, 53, 59, 64, 65, 66, 70, 71, 75, 76, 79, 81, 86, 87, 91, 92, 95,
			98, 99,
		];

		while (
			document.getElementById("SearchVisNumberParent" + props.VisID).firstChild
		) {
			document
				.getElementById("SearchVisNumberParent" + props.VisID)
				.firstChild.remove(); // remove the first child
		}
		let parent = document.getElementById("SearchVisNumberParent" + props.VisID);
		for (let i = 0; i < array.length; i++) {
			let d = document.createElement("div");
			d.innerHTML = array[i] + ",";

			d.className = "SearchVisNumber";
			d.id = props.VisID + "SearchVisNum" + i;
			d.style.backgroundColor = "rgba(0, 150, 0, 0)";
			parent.append(d);
		}
	};

	if (window.screen.width <= 500) {
		for (let i = 1; i < Array.length; i += 2) {
			Array.splice(i, 1);
		}
	}
	const [BtnDisabled, SetBtnDisabled] = useState(0);
	function SetBtnDis(bool) {
		SetBtnDisabled(bool);
	}
	const [HighlightedLines, SetHighlightedLines] = useState([]);

	useEffect(() => {
		SetTarget(Array[Math.round(Math.random() * Array.length)]);
	}, []);

	const [Target, SetTarget] = useState(0);

	CodeArray = props.CodeArray;

	if (props.simplified) {
		CodeArray = props.SimplifiedCodeArray;
	}

	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);

	let NumberHighlightIndex = 0;

	function HighLightCode(newHighlight) {
		SetHighlightedLines([newHighlight]);
	}

	async function GrayOutNumber(number) {
		let Number = document.getElementById(props.VisID + "SearchVisNum" + number);
		if (Number) {
			document.getElementById(
				props.VisID + "SearchVisNum" + number
			).style.color = "rgba(100,100,100,1)";
			await Delay(50);
			Number.innerHTML = "";
			document
				.getElementById(props.VisID + "SearchVisNum" + number)
				.classList.add("SearchVisNumberOut");

			Number.style.color = "rgba(100,100,100,0)";

			await Delay(50);

			Number.remove();
		}
	}

	function HighLightNumber(newHighlight) {
		if (
			document.getElementById(
				props.VisID + "SearchVisNum" + NumberHighlightIndex
			)
		) {
			document.getElementById(
				props.VisID + "SearchVisNum" + NumberHighlightIndex
			).style.backgroundColor = "rgba(49, 78, 136, 0)";
		}

		if (document.getElementById(props.VisID + "SearchVisNum" + newHighlight)) {
			document.getElementById(
				props.VisID + "SearchVisNum" + newHighlight
			).style.backgroundColor = "rgba(0, 150, 0, 1)";
		}
		NumberHighlightIndex = newHighlight;
	}

	return (
		<div className="SearchVis" id={props.id}>
			<div className="SearchVisTitle">{props.Title}</div>
			<div
				className="SearchVisNumberParent"
				id={"SearchVisNumberParent" + props.VisID}
			>
				{Array.map((info, index) => {
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
			<input
				type="range"
				min="0"
				max="300"
				className="SortAlgoSlider"
				onChange={(e) => {
					props.SetDelay(e.target.value);
				}}
			></input>

			<button
				id={"SearchAlgoVisButton" + props.id}
				disabled={BtnDisabled}
				className="SearchAlgoVisButton"
				onClick={() => {
					props.SearchFunction(
						Array,
						Delay,
						delay,
						HighLightCode,
						HighLightNumber,
						GrayOutNumber,
						Target,
						SetBtnDis
					);

					SetBtnDis(true);
				}}
			>
				Search
			</button>
			<button
				id={"SearchAlgoVisButton" + props.id}
				disabled={BtnDisabled}
				className="SearchAlgoVisButton"
				onClick={() => {
					ResetArray();
				}}
			>
				Reset
			</button>

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
		</div>
	);
}

export default SearchVis;
